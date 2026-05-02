<?php

namespace App\Policies;

use App\Models\Quize;
use App\Models\User;

class QuizePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'guru';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Quize $quize): bool
    {
        return $user->id === $quize->teacher_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'guru';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Quize $quize): bool
    {
        return $user->id === $quize->teacher_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Quize $quize): bool
    {
        return $user->id === $quize->teacher_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Quize $quize): bool
    {
        return $user->id === $quize->teacher_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Quize $quize): bool
    {
        return $user->id === $quize->teacher_id;
    }
}
