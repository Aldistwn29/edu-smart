<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create guru
        User::create([
            'name' => 'Guru',
            'email' => 'guru@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'guru',
            'photo' => null,
        ]);

        // create siswa
        User::create([
            'name' => 'Siswa',
            'email' => 'siswa@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
            'photo' => null,
        ]);

        // create siswa dengan faktori
        // untuk membuat 10 siswa agar bisa testing
        User::factory(10)->create([
            'role' => 'siswa',
            'password' => Hash::make('password123'),
        ]);
    }
}
