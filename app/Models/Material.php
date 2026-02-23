<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'class_id',
        'teacher_id',
        'title',
        'description',
        'type',
        'file_path',
        'order',
    ];

    public function class()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function progress()
    {
        return $this->hasMany(MateriProgres::class);
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
