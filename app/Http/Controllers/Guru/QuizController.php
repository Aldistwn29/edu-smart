<?php

namespace App\Http\Controllers\Guru;

use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class QuizController
{
    public function index(): Response
    {
        $teacherId = Auth::id();

        $stats = [
            'total_quizes' => Quize::query()->where('teacher_id', $teacherId)->count(),
            // Mengitung siswa yang belum submit quiz
            'unsubmitted_students' => Quize::query()->where('teacher_id', $teacherId)
                ->with(['classroom' => function ($query) {
                    $query->withCount('students');
                }])
                ->withCount('attempts')
                ->get()
                ->sum(function ($quiz) {
                    $studentCount = $quiz->classroom ? $quiz->classroom->students_count : 0;

                    return max(0, $studentCount - $quiz->attempts_count);
                }),
            'avg_score' => (int) round(QuizAttempt::query()->whereHas('quiz', function ($q) use ($teacherId) {
                $q->where('teacher_id', $teacherId);
            })->avg('score') ?? 0),
        ];

        // Logik daftar quiz dengan progress
        $quizzes = Quize::query()->where('teacher_id', $teacherId)
            ->with(['classroom' => function ($query) {
                $query->withCount('students');
            }])
            ->withCount('attempts')
            ->latest()
            ->paginate(5)
            ->through(function ($quiz) {
                // Menghitung total siswa di kelas quiz tersebut
                $totalStudents = $quiz->classroom ? $quiz->classroom->students_count : 0;

                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'classroom_name' => $quiz->classroom ? $quiz->classroom->name : 'N/A',
                    'completed_count' => $quiz->attempts_count,
                    'total_students' => $totalStudents,
                    'remaining_days' => $quiz->deadline->isPast() ? 0 : (int) round($quiz->deadline->diffInDays(now())),
                    'is_active' => $quiz->deadline->isFuture(),
                ];
            });

        return Inertia::render('Guru/Quiz/Index', [
            'stats' => $stats,
            'quizzes' => $quizzes,
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Quize::class);

        $classrooms = ClassRoom::query()->where('teacher_id', Auth::id())
            ->get(['id', 'name']);

        return Inertia::render('Guru/Quiz/Create', [
            'classrooms' => $classrooms,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Quize::class);

        $messages = [
            'class_id.required' => 'Tolong pilih kelas terlebih dahulu.',
            'title.required' => 'Tolong masukkan judul kuis.',
            'duration_minutes.required' => 'Tolong masukkan durasi kuis.',
            'deadline_date.required' => 'Tolong masukkan tanggal batas waktu.',
            'deadline_time.required' => 'Tolong masukkan jam batas waktu.',
            'questions.*.text.required' => 'Tolong masukkan soalnya.',
            'questions.*.options.*.option_text.required' => 'Tolong masukkan opsi jawabannya.',
        ];

        $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'deadline_date' => 'required|date',
            'deadline_time' => 'required',
            'questions' => 'required|array|min:1',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:multiple_choice,true_false',
            'questions.*.points' => 'required|integer|min:0',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*.option_text' => 'required|string',
            'questions.*.options.*.is_correct' => 'required',
        ], $messages);

        try {
            DB::beginTransaction();

            $deadline = Carbon::parse($request->deadline_date.' '.$request->deadline_time);

            $quiz = Quize::query()->create([
                'class_id' => $request->class_id,
                'teacher_id' => Auth::id(),
                'title' => $request->title,
                'description' => $request->description,
                'duration_minutes' => $request->duration_minutes,
                'deadline' => $deadline,
            ]);

            foreach ($request->questions as $index => $q) {
                // Deteksi jawaban benar dengan lebih fleksibel
                $correctOption = collect($q['options'])->first(function ($opt) {
                    $isCorrect = $opt['is_correct'];

                    return $isCorrect === true || $isCorrect === 1 || $isCorrect === '1' || $isCorrect === 'true' || $isCorrect === 'on';
                });

                $correctAnswer = $correctOption['option_text'] ?? '';

                $quiz->questions()->create([
                    'question' => $q['text'],
                    'type' => $q['type'],
                    'options' => $q['options'],
                    'answer' => $correctAnswer,
                    'points' => $q['points'],
                    'order' => $index + 1,
                ]);
            }

            ActivityLog::query()->create([
                'user_id' => Auth::id(),
                'action_type' => 'create',
                'description' => 'Membuat kuis baru: '.$quiz->title,
                'subject_name' => $quiz->classroom->name ?? 'N/A',
                'loggable_id' => $quiz->id,
                'loggable_type' => Quize::class,
            ]);

            DB::commit();

            return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil dibuat');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Gagal membuat quiz: '.$e->getMessage(), [
                'teacher_id' => Auth::id(),
                'request' => $request->all(),
            ]);

            return back()->withInput()->with('error', 'Gagal membuat quiz. Silakan coba lagi.');
        }
    }

    public function edit(Quize $quiz): Response
    {
        Gate::authorize('update', $quiz);

        $classrooms = ClassRoom::query()->where('teacher_id', Auth::id())
            ->get(['id', 'name']);
        $quiz->load('questions');

        return Inertia::render('Guru/Quiz/Edit', [
            'classrooms' => $classrooms,
            'quiz' => $quiz,
        ]);
    }

    public function update(Request $request, Quize $quiz): RedirectResponse
    {
        Gate::authorize('update', $quiz);

        $messages = [
            'class_id.required' => 'Tolong pilih kelas terlebih dahulu.',
            'title.required' => 'Tolong masukkan judul kuis.',
            'duration_minutes.required' => 'Tolong masukkan durasi kuis.',
            'deadline_date.required' => 'Tolong masukkan tanggal batas waktu.',
            'deadline_time.required' => 'Tolong masukkan jam batas waktu.',
            'questions.*.text.required' => 'Tolong masukkan soalnya.',
            'questions.*.options.*.option_text.required' => 'Tolong masukkan opsi jawabannya.',
        ];

        $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'deadline_date' => 'required|date',
            'deadline_time' => 'required',
            'questions' => 'required|array|min:1',
            'questions.*.id' => 'nullable',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:multiple_choice,true_false',
            'questions.*.points' => 'required|integer|min:0',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*.option_text' => 'required|string',
            'questions.*.options.*.is_correct' => 'required',
        ], $messages);

        try {
            DB::beginTransaction();

            $deadline = Carbon::parse($request->deadline_date.' '.$request->deadline_time);
            $quiz->update([
                'class_id' => $request->class_id,
                'title' => $request->title,
                'description' => $request->description,
                'duration_minutes' => $request->duration_minutes,
                'deadline' => $deadline,
            ]);

            $quiz->questions()->delete();

            foreach ($request->questions as $index => $q) {
                $correctOption = collect($q['options'])->first(function ($opt) {
                    $isCorrect = $opt['is_correct'];

                    return $isCorrect === true || $isCorrect === 1 || $isCorrect === '1' || $isCorrect === 'true' || $isCorrect === 'on';
                });
                $correctAnswer = $correctOption['option_text'] ?? '';

                $quiz->questions()->create([
                    'question' => $q['text'],
                    'type' => $q['type'],
                    'options' => $q['options'],
                    'answer' => $correctAnswer,
                    'points' => $q['points'],
                    'order' => $index + 1,
                ]);
            }

            ActivityLog::query()->create([
                'user_id' => Auth::id(),
                'action_type' => 'update',
                'description' => 'Memperbarui kuis: '.$quiz->title,
                'subject_name' => $quiz->classroom->name ?? 'N/A',
                'loggable_id' => $quiz->id,
                'loggable_type' => Quize::class,
            ]);

            DB::commit();

            return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil diupdate');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Gagal mengupdate quiz: '.$e->getMessage(), [
                'quiz_id' => $quiz->id,
                'teacher_id' => Auth::id(),
            ]);

            return back()->with('error', 'Gagal mengupdate quiz. Silakan coba lagi.');
        }
    }

    public function show(Quize $quiz): Response
    {
        Gate::authorize('view', $quiz);

        $quiz->load(['classroom.students', 'questions']);

        $attempts = QuizAttempt::query()->where('quiz_id', $quiz->id)
            ->with(['student', 'answers.question'])
            ->latest()
            ->get();

        // Map students who haven't attempted yet
        $submittedStudentIds = $attempts->pluck('student_id')->toArray();
        $unsubmittedStudents = $quiz->classroom->students->filter(function ($student) use ($submittedStudentIds) {
            return ! in_array($student->id, $submittedStudentIds);
        });

        return Inertia::render('Guru/Quiz/Show', [
            'quiz' => $quiz,
            'attempts' => $attempts,
            'unsubmitted_students' => $unsubmittedStudents->values(),
        ]);
    }

    public function destroy(Quize $quiz): RedirectResponse
    {
        Gate::authorize('delete', $quiz);

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'delete',
            'description' => 'Menghapus kuis: '.$quiz->title,
            'subject_name' => $quiz->classroom->name ?? 'N/A',
            'loggable_id' => $quiz->id,
            'loggable_type' => Quize::class,
        ]);

        $quiz->delete();

        return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil dihapus');
    }
}
