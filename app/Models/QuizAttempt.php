<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $fillable = [
        'quiz_id',
        'student_id',
        'start_date',
        'end_date',
        'score',
        'max_score',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function getDurationAttribute()
    {
        if (! $this->end_date) {
            return '-';
        }

        return $this->start_date->diffForHumans($this->end_date, true);
    }

    public function quiz()
    {
        return $this->belongsTo(Quize::class, 'quiz_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function answers()
    {
        return $this->hasMany(QuizAnswer::class, 'attempt_id');
    }
}
