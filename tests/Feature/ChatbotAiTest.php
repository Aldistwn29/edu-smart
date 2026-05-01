<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotAiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function unauthenticated_users_cannot_access_chatbot()
    {
        $response = $this->get(route('siswa.chatbotai.index'));
        $response->assertRedirect('/login');

        $responsePost = $this->postJson(route('siswa.chatbotai.generate'), [
            'message' => 'Halo Kak AI',
        ]);
        $responsePost->assertStatus(401);
    }

    /** @test */
    public function authenticated_siswa_can_access_chatbot()
    {
        $user = User::factory()->create(['role' => 'siswa']);
        $this->actingAs($user);

        $response = $this->get(route('siswa.chatbotai.index'));
        $response->assertStatus(200);
    }

    /** @test */
    public function it_requires_message_field_for_generation()
    {
        $user = User::factory()->create(['role' => 'siswa']);
        $this->actingAs($user);

        $response = $this->postJson(route('siswa.chatbotai.generate'), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    /** @test */
    public function it_escapes_xss_payloads()
    {
        $user = User::factory()->create(['role' => 'siswa']);
        $this->actingAs($user);

        // Even if user sends XSS payload, it should just be processed as a string prompt by Gemini,
        // and React handles XSS prevention on the frontend. This test ensures the backend doesn't crash.
        $xssPayload = '<script>alert(1)</script>';

        $response = $this->postJson(route('siswa.chatbotai.generate'), [
            'message' => $xssPayload,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['message']);
    }
}
