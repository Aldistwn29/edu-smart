<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TableClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guru = User::where('role', 'guru')->first();
        $classes = [
            [
                'name' => '7 C',
                'subject' => 'Matematika',
                'academic_year' => '2025/2026',
                'description' => 'Kelas 7 C',
            ],
            [
                'name' => '7 D',
                'subject' => 'Matematika',
                'academic_year' => '2025/2026',
                'description' => 'Kelas 7 D',
            ],
            [
                'name' => '7 E',
                'subject' => 'Matematika',
                'academic_year' => '2025/2026',
                'description' => 'Kelas 7 E',
            ],
        ];
        foreach ($classes as $class) {
            $guru->teachingClasses()->create($class);
        }
    }
}
