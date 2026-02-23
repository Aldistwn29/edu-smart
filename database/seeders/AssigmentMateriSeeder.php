<?php

namespace Database\Seeders;

use App\Models\Assigment;
use App\Models\ClassRoom;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssigmentMateriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guruMTK = User::where('email', 'matematika@edusmart.id')->first();
        $guruIPA = User::where('email', 'ipa@edusmart.id')->first();

        $kelasMTK = ClassRoom::where('teacher_id', $guruMTK->id)->first();
        $kelasIPA = ClassRoom::where('teacher_id', $guruIPA->id)->first();

        // Penugasan MTK
        Assigment::create([
            'class_id' => $kelasMTK->id,
            'teacher_id' => $guruMTK->id,
            'title' => 'Alajabar Linear',
            'description' => 'Latihan soal doang jangan overthiking banyak ko sumber di internet, yang penting usahanya jawaban nanti kita diskusikan',
            'deadline' => now()->addDays(4),
        ]);

        // Penugasan IPA
        Assigment::create([
            'class_id' => $kelasIPA->id,
            'teacher_id' => $guruIPA->id,
            'title' => 'Ekosistem',
            'description' => 'Jangan stress dulu, ini cuman mengamati hal-hal yang ada disekitarmu (sawah, kebun, sungai, dll) dan ceritakan penemuan anda di kelas',
            'deadline' => now()->addDays(7),
        ]);
    }
}
