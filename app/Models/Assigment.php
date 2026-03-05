<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assigment extends Model
{
    protected $fillable = [
        'class_id',
        'teacher_id',
        'material_id',
        'title',
        'description',
        'deadline',
        'submission_types',
        'attachment_path',
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'submission_types' => 'array',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function submissions()
    {
        return $this->hasMany(AssigmentSubmission::class, 'assigment_id');
    }
}
