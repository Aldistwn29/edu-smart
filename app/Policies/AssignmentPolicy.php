<?php

namespace App\Policies;

use App\Models\Assigment;
use App\Models\User;

class AssignmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'guru';
    }

    public function view(User $user, Assigment $assigment): bool
    {
        // Guru hanya bisa lihat tugasnya sendiri
        if ($user->role === 'guru') {
            return $assigment->teacher_id === $user->id;
        }

        // Siswa hanya bisa lihat tugas dari kelas yang diikuti
        if ($user->role === 'siswa') {
            return $user->enrolledClasses()
                ->where('class_rooms.id', $assigment->class_id)
                ->exists();
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->role === 'guru';
    }

    public function update(User $user, Assigment $assigment): bool
    {
        return $user->role === 'guru'
            && $assigment->teacher_id === $user->id;
    }

    public function delete(User $user, Assigment $assigment): bool
    {
        return $user->role === 'guru'
            && $assigment->teacher_id === $user->id;
    }

    public function submit(User $user, Assigment $assigment): bool
    {
        // Siswa hanya bisa submit jika terdaftar di kelas dan belum deadline
        return $user->role === 'siswa'
            && $user->enrolledClasses()
                ->where('class_rooms.id', $assigment->class_id)
                ->exists()
            && now()->lessThanOrEqualTo($assigment->deadline);
    }

    public function grade(User $user, Assigment $assigment): bool
    {
        // Guru hanya bisa menilai tugas yang dia buat
        return $user->role === 'guru'
            && $assigment->teacher_id === $user->id;
    }
}
