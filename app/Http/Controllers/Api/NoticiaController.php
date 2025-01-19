<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Autor;
use App\Models\Categoria;
use App\Models\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller {
    public function index() {
        $noticias = Noticia::join('categorias', 'noticias.id_categoria', '=', 'categorias.id')
            ->join('autores', 'noticias.id_autor', '=', 'autores.id')
            ->select('noticias.id', 'noticias.titulo', 'noticias.contenido', 'categorias.nombre as nombre_categoria', 'autores.nombre as nombre_autor')
            ->get();
        if ($noticias->isEmpty()) {
            $data = [
                'message' => 'No se encontraron resultados',
                'status' => 200,
            ];
            return response()->json($data, 200);
        }
        $data = [
            'result' => $noticias,
            'status' => 200,
        ];
        return response()->json($data, 200);
    }
}
