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

    /**
     * Casting is_completed menjadi boolean agar di React
     * nilainya langsung berupa true/false, bukan 1/0.
     */
    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
