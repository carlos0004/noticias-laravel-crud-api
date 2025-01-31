<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class AutoresCategoriasSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Insertar 20 autores
        for ($i = 1; $i <= 20; $i++) {
            DB::table('autores')->insert([
                'nombre' => 'Autor ' . $i
            ]);
        }

        // Insertar 20 categorías
        for ($i = 1; $i <= 20; $i++) {
            DB::table('categorias')->insert([
                'nombre' => 'Categoría ' . $i
            ]);
        }
    }
}
