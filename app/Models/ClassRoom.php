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
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($class) {
            if (empty($class->code)) {
                $class->code = Str::upper(Str::random(6));
            }
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
        return $this->hasMany(Material::class, 'class_id');
    }

    public function quizzes()
    {
        return $this->hasMany(Quize::class, 'class_id');
    }

    public function assigments()
    {
        return $this->hasMany(Assigment::class, 'class_id');
    }
}
