<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Autor;
use App\Models\Categoria;
use App\Models\Noticia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Mockery\Matcher\Not;

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
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'contenido' => 'required',
            'id_categoria' => 'required|exists:categorias,id',
            'id_autor' => 'required|exists:autores,id',
        ]);
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }
        $noticia = Noticia::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'id_categoria' => $request->id_categoria,
            'id_autor' => $request->id_autor,
        ]);
        if (!$noticia) {
            $data = [
                'message' => 'Error al crear la noticia',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        return response()->json($noticia, 200);
    }

    public function show($id) {
        $noticia = Noticia::with(['categoria', 'autor'])->find($id);
        if (!$noticia) {
            $data = [
                'message' => 'Noticia no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        return response()->json($noticia, 200);
    }

    public function delete($id) {
        $noticia = Noticia::find($id);
        if (!$noticia) {
            $data = [
                'message' => 'Noticia no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $noticia->delete();
        $data = [
            'message' => 'Noticia eliminada',
            'status' => 200,
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $noticia = Noticia::find($id);
        if (!$noticia) {
            $data = [
                'message' => 'Noticia no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:20',
            'contenido' => 'required|max:255',
            'id_categoria' => 'required|exists:categorias,id',
            'id_autor' => 'required|exists:autores,id',
        ]);
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }
        $noticia->titulo = $request->titulo;
        $noticia->contenido = $request->contenido;
        $noticia->id_categoria = $request->id_categoria;
        $noticia->id_autor = $request->id_autor;
        $noticia->save();
        $data = [
            'message' => 'Noticia actualizada',
            'result' => $noticia,
            'status' => 200,
        ];
        return response()->json($data, 200);
    }
    public function updatePartial(Request $request, $id) {
        $noticia = Noticia::find($id);

        if (!$noticia) {
            $data = [
                'message' => 'Noticia no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            'titulo' => 'max:20|unique:noticias,titulo',
            'contenido' => 'max:255',
            'nombre_autor' => 'exists:categorias,id',
            'nombre_categoria' => 'exists:autores,id',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        if ($request->has('titulo')) {
            $noticia->titulo = $request->titulo;
        }
        if ($request->has('contenido')) {
            $noticia->contenido = $request->contenido;
        }
        if ($request->has('nombre_categoria')) {
            $noticia->id_categoria = $request->nombre_categoria;
        }
        if ($request->has('nombre_autor')) {
            $noticia->id_autor = $request->nombre_autor;
        }
        $noticia->save();
        $data = [
            'message' => 'Noticia actualizada',
            'noticia' => $noticia,
            'status' => 200,
        ];
        return response()->json($data, 200);
    }
}
