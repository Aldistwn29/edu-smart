<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'photo',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function teachingClasses()
    {
        return $this->hasMany(ClassRoom::class, 'teacher_id');
    }

    public function enrolledClasses()
    {
        return $this->belongsToMany(ClassRoom::class, 'classroom_user', 'user_id', 'class_room_id')
            ->withTimestamps();
    }

    public function quizzes()
    {
        return $this->hasMany(Quize::class, 'teacher_id');
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class, 'student_id');
    }

    public function materials()
    {
        return $this->hasMany(Material::class, 'teacher_id');
    }

    public function assigments()
    {
        return $this->hasMany(Assigment::class, 'teacher_id');
    }

    public function submissions()
    {
        return $this->hasMany(AssigmentSubmission::class, 'student_id');
    }
}
