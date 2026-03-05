<?php

use App\Http\Controllers\Guru\ClassRoomController;
use App\Http\Controllers\Guru\GuruDashboardController;
use App\Http\Controllers\Guru\MateriController;
use App\Http\Controllers\Guru\QuizController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Siswa\ClassRoomController as SiswaClassRoomController;
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
    return Inertia::render('Dashboard');
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
    Route::put('/quizes/{quiz}', [QuizController::class, 'update'])->name('quizes.update');
    Route::delete('/quizes/{quiz}/delete', [QuizController::class, 'destroy'])->name('quizes.destroy');

    // Materi
    Route::get('/materies', [MateriController::class, 'index'])->name('materies.index');
    Route::get('/materies/create', [MateriController::class, 'create'])->name('materies.create');
    Route::post('/materies', [MateriController::class, 'store'])->name('materies.store');
    Route::get('/materies/{materi}/edit', [MateriController::class, 'edit'])->name('materies.edit');
    Route::put('/materies/{materi}', [MateriController::class, 'update'])->name('materies.update');
    Route::delete('/materies/{materi}/delete', [MateriController::class, 'destroy'])->name('materies.destroy');
});

// Siswa
Route::middleware(['role:siswa'])->prefix('siswa')->name('siswa.')->group(function () {
    Route::get('/dashboard', [SiswaDashboardController::class, 'dashboard'])->name('dashboard');

    // Classroom
    Route::get('/classrooms', [SiswaClassRoomController::class, 'index'])->name('classroom.index');
    Route::post('/classrooms', [SiswaClassRoomController::class, 'join'])->name('classroom.join');
    Route::get('/classrooms/{classroom}', [SiswaClassRoomController::class, 'show'])->name('classroom.show');
    Route::delete('/classrooms/{classroom}/leave', [SiswaClassRoomController::class, 'leave'])->name('classroom.leave');
});
require __DIR__.'/auth.php';
