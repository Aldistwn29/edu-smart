<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quize extends Model
{
    protected $fillable = [
        'class_id',
        'teacher_id',
        'title',
        'description',
        'duration_minutes',
        'deadline',
    ];

    public function questions()
    {
        return $this->hasMany(QuizQuestions::class);
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function class()
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function logs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }
}
