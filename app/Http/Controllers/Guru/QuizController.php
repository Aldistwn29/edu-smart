<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $teacher_id = Auth::id();

        $stats = [
            'total_quizes' => Quize::where('teacher_id', $teacher_id)->count(),
            // Mengitung siswa yang belum submit quiz
            'unsubmitted_students' => Quize::where('teacher_id', $teacher_id)
                ->with(['classroom' => function ($query) {
                    $query->withCount('students');
                }])
                ->withCount('attempts')
                ->get()
                ->sum(function ($quiz) {
                    $student_count = $quiz->classroom ? $quiz->classroom->students_count : 0;

                    return max(0, $student_count - $quiz->attempts_count);
                }),
            'avg_score' => round(QuizAttempt::whereHas('quiz', function ($q) use ($teacher_id) {
                $q->where('teacher_id', $teacher_id);
            })->avg('score') ?? 0),
        ];

        // Logik daftar quiz dengan progress
        $quizzes = Quize::where('teacher_id', $teacher_id)
            ->with(['classroom' => function ($query) {
                $query->withCount('students');
            }])
            ->withCount('attempts')
            ->latest()
            ->paginate(5)
            ->through(function ($quiz) {
                // Menghitung total siswa di kelas quiz tersebut
                $total_students = $quiz->classroom ? $quiz->classroom->students_count : 0;

                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'classroom_name' => $quiz->classroom ? $quiz->classroom->name : 'N/A',
                    'completed_count' => $quiz->attempts_count,
                    'total_students' => $total_students,
                    'remaining_days' => Carbon::parse($quiz->deadline)->isPast() ? 0 : Carbon::parse($quiz->deadline)->diffInDays(now()),
                    'is_active' => Carbon::parse($quiz->deadline)->isFuture(),
                ];
            });

        return Inertia::render('Guru/Quiz/Index', [
            'stats' => $stats,
            'quizzes' => $quizzes,
        ]);
    }

    public function create()
    {
        $classrooms = ClassRoom::where('teacher_id', Auth::id())
            ->get(['id', 'name']);

        return Inertia::render('Guru/Quiz/Create', [
            'classrooms' => $classrooms,
        ]);
    }

    public function store(Request $request)
    {
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
        ]);

        $deadline = Carbon::parse($request->deadline_date.' '.$request->deadline_time);

        $quiz = Quize::create([
            'class_id' => $request->class_id,
            'teacher_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'duration_minutes' => $request->duration_minutes,
            'deadline' => $deadline,
        ]);

        foreach ($request->questions as $index => $q) {
            // Deteksi jawaban benar dengan lebih fleksibel (boolean/string/int)
            $correct_option = collect($q['options'])->first(function ($opt) {
                return $opt['is_correct'] === true || $opt['is_correct'] === 1 || $opt['is_correct'] === '1' || $opt['is_correct'] === 'true' || $opt['is_correct'] === 'on';
            });
            $correct_answer = $correct_option['option_text'] ?? '';

            $quiz->questions()->create([
                'question' => $q['text'],
                'type' => $q['type'],
                'options' => $q['options'],
                'answer' => $correct_answer,
                'points' => $q['points'],
                'order' => $index + 1,
            ]);
        }

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'create',
            'description' => 'Membuat kuis baru: '.$quiz->title,
            'subject_name' => $quiz->classroom->name,
            'loggable_id' => $quiz->id,
            'loggable_type' => Quize::class,
        ]);

        return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil dibuat');
    }

    public function edit(Quize $quiz)
    {
        $classrooms = ClassRoom::where('teacher_id', Auth::id())
            ->get(['id', 'name']);
        $quiz->load('questions');

        return Inertia::render('Guru/Quiz/Edit', [
            'classrooms' => $classrooms,
            'quiz' => $quiz,
        ]);
    }

    public function update(Request $request, Quize $quiz)
    {
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
        ]);

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
            $correct_option = collect($q['options'])->first(function ($opt) {
                return $opt['is_correct'] === true || $opt['is_correct'] === 1 || $opt['is_correct'] === '1' || $opt['is_correct'] === 'true' || $opt['is_correct'] === 'on';
            });
            $correct_answer = $correct_option['option_text'] ?? '';

            $quiz->questions()->create([
                'question' => $q['text'],
                'type' => $q['type'],
                'options' => $q['options'],
                'answer' => $correct_answer,
                'points' => $q['points'],
                'order' => $index + 1,
            ]);
        }

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'update',
            'description' => 'Memperbarui kuis: '.$quiz->title,
            'subject_name' => $quiz->classroom->name,
            'loggable_id' => $quiz->id,
            'loggable_type' => Quize::class,
        ]);

        return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil diupdate');
    }

    public function destroy(Quize $quiz)
    {
        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'delete',
            'description' => 'Menghapus kuis: '.$quiz->title,
            'subject_name' => $quiz->classroom->name,
            'loggable_id' => $quiz->id,
            'loggable_type' => Quize::class,
        ]);

        $quiz->delete();

        return redirect()->route('guru.quizes.index')->with('success', 'Quiz berhasil dihapus');
    }
}
