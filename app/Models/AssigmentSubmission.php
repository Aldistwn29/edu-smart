<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssigmentSubmission extends Model
{
    protected $fillable = [
        'assigment_id',
        'student_id',
        'content',
        'file_path',
        'score',
        'feedback',
        'graded_at',
    ];

    public function assigment()
    {
        return $this->belongsTo(Assigment::class, 'assigment_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
