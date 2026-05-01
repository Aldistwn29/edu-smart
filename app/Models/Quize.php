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

    protected $appends = ['status', 'is_overdue', 'is_urgent'];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    public function getStatusAttribute()
    {
        if (! auth()->check()) {
            return 'tersedia';
        }

        $attempt = $this->attempts()->where('student_id', auth()->id())->first();

        return $attempt ? 'selesai' : 'tersedia';
    }

    public function getIsOverdueAttribute()
    {
        return now()->gt($this->deadline);
    }

    public function getIsUrgentAttribute()
    {
        return now()->lt($this->deadline) && now()->diffInHours($this->deadline) < 24;
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestions::class);
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class, 'quiz_id');
    }

    public function classroom()
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
