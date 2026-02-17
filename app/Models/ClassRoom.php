<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ClassRoom extends Model
{
    protected $fillable = [
        'teacher_id',
        'name',
        'subject',
        'description',
        'code',
        'academic_year',
    ];

    // genrate code untuk kelas
    public static function boot()
    {
        parent::boot();

        // generate code untuk kelas
        static::creating(function ($classRoom) {
            $classRoom->code = strtoupper(Str::random(6));
        });
    }

    public function teacher()
    {
        return $this->belongsTo(User::class);
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'classroom_user', 'class_room_id', 'user_id')
            ->withTimestamps();
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quize::class);
    }

    public function assigments()
    {
        return $this->hasMany(Assigment::class);
    }
}
