<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MateriProgres extends Model
{
    protected $fillable = [
        'student_id',
        'material_id',
        'is_completed',
    ];
}
