<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestions extends Model
{
    protected $fillable = [
        'quize_id',
        'question',
        'type',
        'options',
        'answer',
        'points',
        'order',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quize::class, 'quize_id');
    }

    public function answers()
    {
        return $this->hasMany(QuizAnswer::class, 'question_id');
    }
}
