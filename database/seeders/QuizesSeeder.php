<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Quize;
use App\Models\QuizQuestions;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuizesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guru = User::where('email', 'matematika@edusmart.id')->first();
        $kelas = ClassRoom::where('teacher_id', $guru->id)->first();

        // buat header quiz
        $quiz = Quize::create([
            'class_id' => $kelas->id,
            'teacher_id' => $guru->id,
            'title' => 'Aljabar Dasar',
            'Description' => 'Kerjakan dengan enjoy dan jangan lupa berdoa sebelum mengerjakan',
            'duration_minutes' => 60,
            'deadline' => now()->addDays(3),
        ]);

        // soal
        $questions = [
            [
                'question' => 'Jika 3x = 12. Maka nilai x adalah .....',
                'type' => 'multiple_choice',
                'options' => ['2', '3', '4', '6'],
                'answer' => '4',
                'points' => 10,
            ],
            [
                'question' => 'Apakah x + y = y + x. Termasuk hukum kuantitatif?',
                'type' => 'true_false',
                'options' => ['Benar', 'Salah'],
                'answer' => 'Benar',
                'points' => 10,
            ],

        ];

        foreach ($questions as $index => $question) {
            QuizQuestions::create([
                'quize_id' => $quiz->id,
                'question' => $question['question'],
                'type' => $question['type'],
                'options' => $question['options'],
                'answer' => $question['answer'],
                'points' => $question['points'],
                'order' => $index + 1,
            ]);
        }
    }
}
