<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('assigments', function (Blueprint $table) {
            $table->foreignId('material_id')->nullable()->after('teacher_id')->constrained('materials')->nullOnDelete();
            $table->json('submission_types')->nullable()->after('deadline');
            $table->string('attachment_path')->nullable()->after('submission_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assigments', function (Blueprint $table) {
            $table->dropForeign(['material_id']);
            $table->dropColumn(['material_id', 'submission_types', 'attachment_path']);
        });
    }
};
