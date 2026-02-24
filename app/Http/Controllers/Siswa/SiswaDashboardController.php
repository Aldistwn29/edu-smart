<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\MateriProgres;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiswaDashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $student_id = $user->id;

        // Statistika umum
        $totalMaterialsEnrolled = Material::whereIn('class_id', function ($query) use ($student_id) {
            $query->select('class_room_id')->from('classroom_user')->where('user_id', $student_id);
        })->count();
        $completedMaterialsCount = MateriProgres::where('student_id', $student_id)
            ->where('is_completed', true)
            ->count();

        $stats = [
            'materi_selesai' => "$completedMaterialsCount/$totalMaterialsEnrolled",
            'quiz_dikerjakan' => QuizAttempt::where('student_id', $student_id)->distinct('quiz_id')->count().'/'.Quize::whereIn('class_id', function ($query) use ($student_id) {
                $query->select('class_room_id')->from('classroom_user')->where('user_id', $student_id);
            })->count(),
            'nilai_rata_rata' => round(QuizAttempt::where('student_id', $student_id)->avg('score') ?? 0),
            'jam_belajar' => ActivityLog::where('user_id', $student_id)->count(),
        ];

        // Progress belajar
        $progress_belajar = ClassRoom::whereHas('students', fn ($q) => $q->where('users.id', $student_id))
            ->withCount('materials')
            ->get()
            ->map(function ($class) use ($student_id) {
                $totalClassMaterials = $class->materials_count;
                $completedInClass = MateriProgres::where('student_id', $student_id)
                    ->whereIn('material_id', $class->materials->pluck('id'))
                    ->where('is_completed', true)
                    ->count();

                $percentage = $totalClassMaterials > 0
                    ? round(($completedInClass / $totalClassMaterials) * 100)
                    : 0;

                return [
                    'id' => $class->id,
                    'subject' => $class->subject,
                    'last_activity' => ActivityLog::where('user_id', $student_id)
                        ->where('subject_name', $class->subject)
                        ->latest()
                        ->first()?->created_at->diffForHumans() ?? 'Belum ada aktivitas',
                    'percentage' => $percentage,
                ];
            });

        // Quiz terakhir
        $quiz_terakhir = QuizAttempt::where('student_id', $student_id)
            ->with(['quiz.classroom'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($attempt) => [
                'id' => $attempt->id,
                'title' => $attempt->quiz->title,
                'subject' => $attempt->quiz->classroom->subject ?? 'N/A',
                'score' => $attempt->score,
                'date' => $attempt->created_at->diffForHumans(),
            ]);

        return Inertia::render('Siswa/Dashboard', [
            'stats' => $stats,
            'progress_belajar' => $progress_belajar,
            'quiz_terakhir' => $quiz_terakhir,
        ]);
    }
}
