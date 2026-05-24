<?php

namespace App\Http\Controllers\Siswa;

use App\Models\QuizAnswer;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController
{
    public function index(): Response
    {
        $user = Auth::user();
        $classIds = $user->enrolledClasses()->pluck('class_rooms.id');

        $quizzes = Quize::query()->whereIn('class_id', $classIds, 'and', false)
            ->with(['attempts' => function ($q) use ($user) {
                $q->where('student_id', $user->id);
            }, 'classroom', 'teacher'])
            ->withCount('questions')
            ->latest()
            ->paginate(10)
            ->through(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'mapel' => $quiz->classroom->subject ?? 'N/A',
                    'guru' => $quiz->teacher->name ?? 'N/A',
                    'jumlah_soal' => $quiz->questions_count,
                    'deadline' => $quiz->deadline->format('d M Y, H:i'),
                    'status' => $quiz->status,
                    'is_overdue' => $quiz->is_overdue,
                    'is_urgent' => $quiz->is_urgent,
                    'score' => $quiz->attempts->first()->score ?? 0,
                ];
            });

        // Untuk stats, kita butuh data mentah tanpa paginasi
        $allQuizzes = Quize::query()->whereIn('class_id', $classIds, 'and', false)
            ->with(['attempts' => function ($q) use ($user) {
                $q->where('student_id', $user->id);
            }])
            ->get();

        $stats = [
            'total_selesai' => QuizAttempt::query()
                ->where('student_id', $user->id)
                ->whereNotNull('end_date')
                ->count(),
            'rata_rata' => (int) round(QuizAttempt::query()
                ->where('student_id', $user->id)
                ->whereNotNull('end_date')
                ->avg('score') ?? 0),
            'mendatang' => $allQuizzes->where('status', 'tersedia')
                ->where('is_overdue', false)
                ->count(),
        ];

        return Inertia::render('Siswa/Quiz/Index', [
            'quizzes' => $quizzes,
            'stats' => $stats,
        ]);
    }

    public function show(Quize $quiz): Response|RedirectResponse
    {
        $user = Auth::user();

        $existAttempt = QuizAttempt::query()->where('quiz_id', $quiz->id)
            ->where('student_id', $user->id)
            ->first();

        if ($existAttempt && $existAttempt->status === 'completed') {
            return redirect()->route('siswa.quizzes.result', $quiz->id)
                ->with('error', 'Anda sudah mengerjakan quis ini.');
        }

        if (now()->gt($quiz->deadline)) {
            return redirect()->back()->with('error', 'Waktu Pengerjaan kuis sudah terlambat');
        }

        $attempt = QuizAttempt::query()->firstOrCreate(
            ['quiz_id' => $quiz->id, 'student_id' => $user->id],
            ['start_date' => now()],
        );

        // Menghitung siswa waktu (detik) untuk Timer di react
        $durationInSeconds = $quiz->duration_minutes * 60;
        $elapsedSeconds = now()->diffInSeconds($attempt->start_date);
        $timeLeft = (int) round(max(0, $durationInSeconds - $elapsedSeconds));

        return Inertia::render('Siswa/Quiz/Examp', [
            'quiz' => $quiz->load('questions'),
            'initialTime' => $timeLeft,
            'attemptId' => $attempt->id,
        ]);
    }

    public function submit(Request $request, Quize $quiz): RedirectResponse
    {
        $user = Auth::user();
        $attempt = QuizAttempt::query()->where('quiz_id', $quiz->id)
            ->where('student_id', $user->id)
            ->firstOrFail();

        $answers = $request->input('answers', []);
        $totalQuestions = $quiz->questions()->count();
        $correctAnswers = 0;

        foreach ($quiz->questions as $question) {
            $studentAnswer = $answers[$question->id] ?? null;

            // Handle array case to avoid "Array to string conversion" error
            $dbAnswer = is_array($studentAnswer) ? json_encode($studentAnswer) : (string) ($studentAnswer ?? '');

            $isCorrect = $studentAnswer == $question->answer;

            if ($isCorrect) {
                $correctAnswers++;
            }

            QuizAnswer::query()->updateOrCreate(
                ['attempt_id' => $attempt->id, 'question_id' => $question->id],
                [
                    'student_answer' => $dbAnswer,
                    'is_correct' => $isCorrect,
                    'point_earned' => $isCorrect ? $question->points : 0,
                ]
            );
        }

        $score = $totalQuestions > 0 ? ($correctAnswers / $totalQuestions) * 100 : 0;

        $attempt->update([
            'end_date' => now(),
            'score' => $score,
            'max_score' => 100,
        ]);

        return redirect()->route('siswa.quizzes.index')->with('success', 'Kuis berhasil dikirim!');
    }

    public function result(Quize $quiz): Response
    {
        $user = Auth::user();
        $attempt = QuizAttempt::query()->where('quiz_id', $quiz->id)
            ->where('student_id', $user->id)
            ->with(['answers'])
            ->firstOrFail();

        $quiz->load('questions');

        return Inertia::render('Siswa/Quiz/Result', [
            'quiz' => $quiz,
            'attempt' => $attempt,
        ]);
    }
}
