<?php

use App\Http\Controllers\Guru\AssignmentsController;
use App\Http\Controllers\Guru\ClassRoomController;
use App\Http\Controllers\Guru\GuruDashboardController;
use App\Http\Controllers\Guru\MateriController;
use App\Http\Controllers\Guru\QuizController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Siswa\AssigementController;
use App\Http\Controllers\Siswa\ChatbotAi;
use App\Http\Controllers\Siswa\ClassRoomController as SiswaClassRoomController;
use App\Http\Controllers\Siswa\MateriController as SiswaMateriController;
use App\Http\Controllers\Siswa\QuizController as SiswaQuizController;
use App\Http\Controllers\Siswa\SiswaDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->role === 'guru') {
        return redirect()->route('guru.dashboard');
    }

    if ($user->role === 'siswa') {
        return redirect()->route('siswa.dashboard');
    }

    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route group role
// Guru
Route::middleware(['role:guru'])->prefix('guru')->name('guru.')->group(function () {
    Route::get('/dashboard', [GuruDashboardController::class, 'dashboard'])->name('dashboard');

    // classroom
    Route::get('/classrooms', [ClassRoomController::class, 'index'])->name('classroom.index');
    Route::post('/classrooms', [ClassRoomController::class, 'store'])->name('classroom.store');
    Route::get('/classrooms/{classRoom}', [ClassRoomController::class, 'show'])->name('classroom.show');
    Route::delete('/classrooms/{classRoom}/delete', [ClassRoomController::class, 'destroy'])->name('classroom.destroy');

    // Quiz
    Route::get('/quizes', [QuizController::class, 'index'])->name('quizes.index');
    Route::get('/quizes/create', [QuizController::class, 'create'])->name('quizes.create');
    Route::post('/quizes', [QuizController::class, 'store'])->name('quizes.store');
    Route::get('/quizes/{quiz}/edit', [QuizController::class, 'edit'])->name('quizes.edit');
    Route::get('/quizes/{quiz}', [QuizController::class, 'show'])->name('quizes.show');
    Route::put('/quizes/{quiz}', [QuizController::class, 'update'])->name('quizes.update');
    Route::delete('/quizes/{quiz}/delete', [QuizController::class, 'destroy'])->name('quizes.destroy');

    // Materi
    Route::get('/materies', [MateriController::class, 'index'])->name('materies.index');
    Route::get('/materies/create', [MateriController::class, 'create'])->name('materies.create');
    Route::post('/materies', [MateriController::class, 'store'])->name('materies.store');
    Route::get('/materies/{materi}/edit', [MateriController::class, 'edit'])->name('materies.edit');
    Route::get('/materies/{materi}', [MateriController::class, 'show'])->name('materies.show');
    Route::put('/materies/{materi}', [MateriController::class, 'update'])->name('materies.update');
    Route::delete('/materies/{materi}/delete', [MateriController::class, 'destroy'])->name('materies.destroy');

    // Penugasan
    Route::get('/assigments', [AssignmentsController::class, 'index'])->name('assigments.index');
    Route::get('/assigments/create', [AssignmentsController::class, 'create'])->name('assigments.create');
    Route::post('/assigments', [AssignmentsController::class, 'store'])->name('assigments.store');
    Route::get('/assigments/{assigment}/edit', [AssignmentsController::class, 'edit'])->name('assigments.edit');
    Route::put('/assigments/{assigment}', [AssignmentsController::class, 'update'])->name('assigments.update');
    Route::get('/assigments/{assigment}/submissions', [AssignmentsController::class, 'submissions'])->name('assigments.submissions');
    Route::post('/assigments/submissions/{submission}/grade', [AssignmentsController::class, 'grade'])->name('assigments.grade');
    Route::delete('/assigments/{assigment}/delete', [AssignmentsController::class, 'destroy'])->name('assigments.destroy');
});

// Siswa
Route::middleware(['role:siswa'])->prefix('siswa')->name('siswa.')->group(function () {
    Route::get('/dashboard', [SiswaDashboardController::class, 'dashboard'])->name('dashboard');

    // Classroom
    Route::get('/classrooms', [SiswaClassRoomController::class, 'index'])->name('classroom.index');
    Route::post('/classrooms', [SiswaClassRoomController::class, 'join'])->name('classroom.join');
    Route::get('/classrooms/{classroom}', [SiswaClassRoomController::class, 'show'])->name('classroom.show');
    Route::delete('/classrooms/{classroom}/leave', [SiswaClassRoomController::class, 'leave'])->name('classroom.leave');

    // Quiz
    Route::get('/quizzes', [SiswaQuizController::class, 'index'])->name('quizzes.index');
    Route::get('/quizzes/{quiz}/take', [SiswaQuizController::class, 'show'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/submit', [SiswaQuizController::class, 'submit'])
        ->middleware('throttle:quiz-submissions')
        ->name('quizzes.submit');
    Route::get('/quizzes/{quiz}/result', [SiswaQuizController::class, 'result'])->name('quizzes.result');

    // Materi
    Route::get('/materies', [SiswaMateriController::class, 'index'])->name('materies.index');
    Route::get('/materies/{material}', [SiswaMateriController::class, 'show'])->name('materies.show');
    Route::post('/materies/{material}/completed', [SiswaMateriController::class, 'completed'])->name('materies.completed');

    // Penugasan
    Route::get('/assigements', [AssigementController::class, 'index'])->name('assigements.index');
    Route::get('/assigements/{assigment}/show', [AssigementController::class, 'show'])->name('assigements.show');
    Route::post('/assigements/{assigment}/submit', [AssigementController::class, 'store'])
        ->middleware('throttle:uploads')
        ->name('assigements.submit');
    Route::get('/assigements/{assigment}/success', [AssigementController::class, 'success'])->name('assigements.success');

    // Chatbot
    Route::get('/chatbot', [ChatbotAi::class, 'index'])->name('chatbotai.index');
    Route::post('/chatbot/generate', [ChatbotAi::class, 'generate'])->name('chatbotai.generate');
});
require __DIR__.'/auth.php';
