<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classrooms = Auth::user()
            ->enrolledClasses()
            ->with('teacher')
            ->withCount('students')
            ->latest()
            ->get();

        return Inertia('Siswa/ClassRoom/Index', [
            'classrooms' => $classrooms,
        ]);
    }

    public function join(Request $request)
    {
        // Validasi input kode
        $request->validate([
            'code' => 'required|string',
        ], [
            'code.required' => 'Masukkan code kelas. ',
        ]);

        // cari berdasarkan code
        $classroom = ClassRoom::where('code', strtoupper($request->code))->first();

        // cek jika kelas tidak ditemukkan
        if (! $classroom) {
            return back()->withErrors(['code' => 'Kode kelas tidak valid atau tidak ditemukkan']);
        }

        // cek apakah siswa sudah bergabung
        $user = Auth::user();

        if ($classroom->students()->where('user_id', $user->id)->exists()) {
            return back()->withErrors(['code' => 'Kamu sudah bergabung di kelas ini.']);
        }

        // hubungkan siswa ke kelas
        $classroom->students()->attach($user->id);

        return redirect()->route('siswa.classroom.show', $classroom->id)
            ->with('success', "Berhasil bergabung ke kelas {$classroom->name}");
    }

    public function show(ClassRoom $classroom)
    {
        $user = Auth::user();

        // Pastikan siswa terdaftar
        if (! $classroom->students()->where('user_id', $user->id)->exists()) {
            abort(403, 'Anda bukan anggota kelas ini.');
        }

        // Load relations efficiently
        $classroom->load([
            'teacher:id,name',
            'materials' => function ($query) use ($user) {
                $query->with(['progress' => function ($q) use ($user) {
                    $q->where('student_id', $user->id);
                }])->orderBy('order', 'asc');
            },
        ])->loadCount(['students', 'materials']);

        // Quick calculation of stats
        $totalMaterials = $classroom->materials_count;
        $completedMaterials = $classroom->materials->filter(function ($material) {
            return $material->progress->first()?->is_completed;
        })->count();

        $progressValue = $totalMaterials > 0
            ? round(($completedMaterials / $totalMaterials) * 100)
            : 0;

        return inertia('Siswa/ClassRoom/Show', [
            'classroom' => $classroom,
            'materials' => $classroom->materials,
            'progressValue' => $progressValue,
            'completedCount' => $completedMaterials,
            'totalCount' => $totalMaterials,
        ]);
    }
}
