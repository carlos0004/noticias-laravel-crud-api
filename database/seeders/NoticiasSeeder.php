<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoticiasSeeder extends Seeder {
    public function run(): void {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('noticias')->insert([
                'titulo' => 'Noticia ' . $i,
                'id_autor' => rand(1, 20), // Selecciona un autor aleatorio
                'id_categoria' => rand(1, 20), // Selecciona una categoría aleatoria
                'contenido' => 'Este es el contenido de la noticia ' . $i
            ]);
        }
    }
}
