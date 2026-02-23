<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\Quize;
use App\Models\User;
use Illuminate\Database\Seeder;

class ActivityLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = User::where('role', 'guru')->get();

        foreach ($teachers as $teacher) {
            // Log for creating a class
            $class = ClassRoom::where('teacher_id', $teacher->id)->first();
            if ($class) {
                ActivityLog::create([
                    'user_id' => $teacher->id,
                    'action_type' => 'create_class',
                    'description' => 'Membuat kelas baru: '.$class->name,
                    'subject_name' => $class->subject,
                    'loggable_id' => $class->id,
                    'loggable_type' => 'classroom', // Adjust if you use full class name in morph map
                    'created_at' => now()->subHours(5),
                ]);

                // Log for adding material
                $materials = Material::where('class_id', $class->id)->get();
                foreach ($materials as $index => $material) {
                    ActivityLog::create([
                        'user_id' => $teacher->id,
                        'action_type' => 'upload_material',
                        'description' => 'Mengunggah materi: '.$material->title,
                        'subject_name' => $class->subject,
                        'loggable_id' => $material->id,
                        'loggable_type' => 'material',
                        'created_at' => now()->subHours(4 - $index), // Staggered time
                    ]);
                }

                // Log for creating quiz
                $quizzes = Quize::where('class_id', $class->id)->get();
                foreach ($quizzes as $index => $quiz) {
                    ActivityLog::create([
                        'user_id' => $teacher->id,
                        'action_type' => 'create_quiz',
                        'description' => 'Membuat kuis baru: '.$quiz->title,
                        'subject_name' => $class->subject,
                        'loggable_id' => $quiz->id,
                        'loggable_type' => 'quiz',
                        'created_at' => now()->subHours(1),
                    ]);
                }
            }
        }
    }
}
