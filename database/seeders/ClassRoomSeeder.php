<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClassRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guru = User::where('role', 'guru')->get();
        $siswa = User::where('role', 'siswa')->get();

        // Daftar kelas
        $classData = [
            ['name' => '7', 'subject' => 'Matematika'],
            ['name' => '7', 'subject' => 'IPA'],
            ['name' => '7', 'subject' => 'IPS'],
            ['name' => '7', 'subject' => 'Biologi'],
            ['name' => '7', 'subject' => 'PPKN'],
            ['name' => '7', 'subject' => 'PAI'],
            ['name' => '7', 'subject' => 'Bahasa Sunda'],
        ];

        foreach ($classData as $data) {
            // Map subjek ke email guru yang sesuai
            $teacherEmail = match ($data['subject']) {
                'Matematika' => 'matematika@edusmart.id',
                'IPA' => 'ipa@edusmart.id',
                'IPS' => 'ips@edusmart.id',
                'Biologi' => 'biologi@edusmart.id',
                'PPKN' => 'ppkn@edusmart.id',
                'PAI' => 'pai@edusmart.id',
                'Bahasa Sunda' => 'sunda@edusmart.id',
                default => 'matematika@edusmart.id',
            };

            $teacher = User::where('email', $teacherEmail)->first();

            $kelas = ClassRoom::create([
                'teacher_id' => $teacher->id ?? $guru->first()->id,
                'name' => $data['name'],
                'subject' => $data['subject'],
                'academic_year' => '2025/2026',
                'description' => 'Selamat datang di kelas '.$data['name'].' '.$data['subject'].'. Semangat belajar dan raih mimpi anda lewat pendidikan',
            ]);

            // handle siswa
            $kelas->students()->attach($siswa->pluck('id'));
        }
    }
}
