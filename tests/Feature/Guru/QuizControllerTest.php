<?php

namespace Tests\Feature\Guru;

use App\Models\ClassRoom;
use App\Models\Quize;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuizControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_redirects_to_the_created_quiz_page(): void
    {
        $teacher = User::factory()->create([
            'role' => 'guru',
        ]);

        $classroom = ClassRoom::query()->create([
            'teacher_id' => $teacher->id,
            'name' => 'Kelas A',
            'subject' => 'Matematika',
            'description' => 'Kelas percobaan',
            'academic_year' => '2025/2026',
        ]);

        $response = $this->actingAs($teacher)->post(route('guru.quizes.store'), [
            'class_id' => $classroom->id,
            'title' => 'Quiz Dasar',
            'description' => 'Latihan awal',
            'duration_minutes' => 15,
            'deadline_date' => now()->addDay()->format('Y-m-d'),
            'deadline_time' => '12:00',
            'questions' => [
                [
                    'text' => '2 + 2 = ?',
                    'type' => 'multiple_choice',
                    'points' => 10,
                    'options' => [
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => true],
                    ],
                ],
            ],
        ]);

        $quiz = Quize::query()->latest('id')->firstOrFail();

        $response->assertRedirect(route('guru.quizes.show', $quiz, false));
        $this->assertSame('Quiz Dasar', $quiz->title);
    }

    public function test_update_redirects_to_the_quiz_page(): void
    {
        $teacher = User::factory()->create([
            'role' => 'guru',
        ]);

        $classroom = ClassRoom::query()->create([
            'teacher_id' => $teacher->id,
            'name' => 'Kelas A',
            'subject' => 'Matematika',
            'description' => 'Kelas percobaan',
            'academic_year' => '2025/2026',
        ]);

        $quiz = Quize::query()->create([
            'class_id' => $classroom->id,
            'teacher_id' => $teacher->id,
            'title' => 'Quiz Lama',
            'description' => 'Sebelum diubah',
            'duration_minutes' => 10,
            'deadline' => now()->addDay(),
        ]);

        $response = $this->actingAs($teacher)->put(route('guru.quizes.update', $quiz), [
            'class_id' => $classroom->id,
            'title' => 'Quiz Baru',
            'description' => 'Sesudah diubah',
            'duration_minutes' => 20,
            'deadline_date' => now()->addDays(2)->format('Y-m-d'),
            'deadline_time' => '13:30',
            'questions' => [
                [
                    'text' => 'Ibu kota Indonesia?',
                    'type' => 'multiple_choice',
                    'points' => 10,
                    'options' => [
                        ['option_text' => 'Bandung', 'is_correct' => false],
                        ['option_text' => 'Jakarta', 'is_correct' => true],
                    ],
                ],
            ],
        ]);

        $response->assertRedirect(route('guru.quizes.show', $quiz, false));
        $this->assertSame('Quiz Baru', $quiz->fresh()->title);
    }
}
