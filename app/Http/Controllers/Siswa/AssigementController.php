<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Assigment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AssigementController extends Controller
{
    public function index(): Response
    {
        $studentId = auth()->id();
        $now = Carbon::now();

        // Siswa terhubung ke kelas via pivot table classroom_user (many-to-many)
        // bukan lewat kolom class_id di tabel users
        $classIds = auth()->user()->enrolledClasses()->pluck('class_rooms.id');

        $assignments = Assigment::with(['teacher', 'classroom', 'submissions' => function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        }])
            ->whereIn('class_id', $classIds)
            ->get()
            ->map(function ($assignment) use ($now) {
                $submission = $assignment->submissions->first();
                $isLate = $now->greaterThan($assignment->deadline) && ! $submission;

                $status = 'Mampu di kerjakan';
                if ($isLate) {
                    $status = 'Sudah lewat';
                }
                if ($submission) {
                    $status = $submission->graded_at ? 'Sudah dinilai' : 'Sedang dinilai';
                }

                return [
                    'id' => $assignment->id,
                    'title' => $assignment->title,
                    'teacher' => $assignment->teacher?->name,
                    'deadline' => Carbon::parse($assignment->deadline)->translatedFormat('d F Y'),
                    'status' => $status,
                    'type' => $assignment->type,
                    'progress' => $submission ? 100 : 0,
                    'score' => $submission ? $submission->score : null,
                ];
            });

        $stats = [
            'total_late' => $assignments->where('status', 'Sudah lewat')->count(),
            'total_submitted' => $assignments->whereIn('status', ['Sedang dinilai', 'Sudah dinilai'])->count(),
            'total_graded' => $assignments->where('status', 'Sudah dinilai')->count(),
            'total_active' => $assignments->where('status', 'Mampu di kerjakan')->count(),
        ];

        return Inertia::render('Siswa/Assigement/Index', [
            'assigement' => $assignments,
            'stats' => $stats,
        ]);
    }

    protected function authorizeStudentForAssignment(Assigment $assigment): void
    {
        if (! auth()->user()->enrolledClasses()
            ->where('class_rooms.id', $assigment->class_id)
            ->exists()
        ) {
            abort(403);
        }
    }

    public function show(Assigment $assigment): Response
    {
        $this->authorizeStudentForAssignment($assigment);

        $studentId = auth()->id();
        $assigment->load(['teacher', 'submissions' => function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        }]);

        $submission = $assigment->submissions->first();

        return Inertia::render('Siswa/Assigement/Show', [
            'assigement' => [
                'id' => $assigment->id,
                'title' => $assigment->title,
                'teacher' => $assigment->teacher?->name,
                'deadline' => Carbon::parse($assigment->deadline)->translatedFormat('d F Y'),
                'description' => $assigment->description ?? 'Tidak ada deskripsi tambahan',
                'status' => $submission ? ($submission->graded_at ? 'Sudah dinilai' : 'Sedang dinilai') : (Carbon::now()->greaterThan($assigment->deadline) ? 'Sudah lewat' : 'Mampu di kerjakan'),
                'attachment' => $assigment->attachment_path ? [
                    'path' => $assigment->attachment_path,
                    'name' => basename($assigment->attachment_path),
                    'extension' => strtolower(pathinfo($assigment->attachment_path, PATHINFO_EXTENSION)),
                ] : null,
                'submission' => $submission ? [
                    'file_path' => $submission->file_path,
                    'score' => $submission->score,
                    'note' => $submission->content,
                ] : null,
            ],
        ]);
    }

    public function store(Request $request, Assigment $assigment)
    {
        $student = auth()->user();

        $this->authorizeStudentForAssignment($assigment);

        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,zip|max:10240',
            'note' => 'nullable|string|max:500',
        ]);

        $existingSubmission = $assigment->submissions()->where('assigment_id', $assigment->id)
            ->where('student_id',  $student->id)
            ->first();

        if($existingSubmission) {
            return redirect()->back()->with('error', 'Anda sudah mengirimkan tugas ini');
        }

        try {
            DB::beginTransaction();

            $file = $request->file('file');
            $fillName = time() . '_' .$file->getClientOriginalName();
            $path = $file->storeAs(
                "assigements/{$assigment->id}/submissions",
                $fillName,
                'public'
            );

            $submission = $assigment->submissions()->create([
                'student_id' => $student->id,
                'file_path' => $path,
                'content' => $request->input('note'),
                'score' => 0,
            ]);

            DB::commit();

            return redirect()->route('siswa.assigements.success', $assigment->id)
                ->with('success', 'Tugas berhasil dikirim');

        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal mengirim tugas. Silakan coba lagi.');
        }

    }


    public function success(Assigment $assigment)
    {
        $studentId = auth()->id();

        $submission = $assigment->submissions()
            ->where('student_id', $studentId)
            ->first();
        if(!$submission) {
            return redirect()->route('siswa.assigements.show', $assigment->id)->with('error', 'Tugas tidak ditemukan');
        }

        $this->authorizeStudentForAssignment($assigment);

        return Inertia::render('Siswa/Assigement/Success', [
            'submission' => [
                'taskName' => $assigment->title,
                'submissionTime' => $submission->created_at->translatedFormat('M, Y H.i'),
                'fileName' => basename($submission->file_path),
                'status' => 'Berhasil dikumpulkan',
                'score' => $submission->graded_at ? $submission->score : null,
                'reviewStatus' => $submission->graded_at ? 'Sudah dinilai' : 'Sedang direview',
            ]
        ]);
    }
}
