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
            ['name' => '7', 'subject' => 'Ilmu Pengetahuan Alam'],
            ['name' => '7', 'subject' => 'Ilmu Pengetahuan Sosial'],
            ['name' => '7', 'subject' => 'Pendidikan Kewarganegaraan'],
            ['name' => '7', 'subject' => 'Bahasa Indonesia'],
        ];

        foreach ($classData as $data) {
            // Map subjek ke email guru yang sesuai
            $teacherEmail = match ($data['subject']) {
                'Matematika' => 'matematika@edusmart.id',
                'Ilmu Pengetahuan Alam' => 'ipa@edusmart.id',
                'Ilmu Pengetahuan Sosial' => 'ips@edusmart.id',
                'Bahasa Indonesia' => 'bahasa@edusmart.id',
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
