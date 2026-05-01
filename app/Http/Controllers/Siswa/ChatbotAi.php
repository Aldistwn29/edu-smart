<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Services\LearningAnalysisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatbotAi extends Controller
{
    protected $learningAnalysisService;

    public function __construct(LearningAnalysisService $learningAnalysisService)
    {
        $this->learningAnalysisService = $learningAnalysisService;
    }

    public function index()
    {
        return Inertia::render('Siswa/Chatbot/Index');
    }

    public function generate(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $user = Auth::user();

        // Pass to the service to generate the AI response
        $reply = $this->learningAnalysisService->generateAnalysis($user, $request->message);

        return response()->json([
            'message' => $reply,
        ]);
    }
}
