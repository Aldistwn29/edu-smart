<?php

namespace Tests\Unit;

use App\Models\QuizQuestions;
use PHPUnit\Framework\TestCase;

class QuizQuestionsTest extends TestCase
{
    public function test_quiz_questions_do_not_use_timestamps(): void
    {
        $quizQuestion = new QuizQuestions;

        $this->assertFalse($quizQuestion->usesTimestamps());
    }
}
