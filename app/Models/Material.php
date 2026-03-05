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
        'content',
        'file_path',
        'order',
    ];

    protected $appends = ['file_path_url'];

    public function getFilePathUrlAttribute()
    {
        return $this->file_path ? asset('storage/'.$this->file_path) : null;
    }

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
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
