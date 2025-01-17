<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriaController extends Controller {
    public function index() {
        $categorias = Categoria::all();
        if ($categorias->isEmpty()) {
            $data = [
                'message' => 'No se encontraron resultados',
                'status' => 200,
            ];
            return response()->json($data, 200);
        }
        $data = [
            'result' => $categorias,
            'status' => 200,
        ];
        return response()->json($data, 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|unique:categorias,nombre',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $categoria = Categoria::create([
            'nombre' => $request->nombre,
        ]);

        if (!$categoria) {
            $data = [
                'message' => 'Error al crear la categoria',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        return response()->json($categoria, 200);
    }

    public function show($id) {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            $data = [
                'message' => 'Categoria no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $data = [
            'categoria' => $categoria,
            'status' => 200
        ];
        return response()->json($categoria, 200);
    }

    public function delete($id) {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            $data = [
                'message' => 'Categoria no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $categoria->delete();
        $data = [
            'message' => 'Categoria eliminada',
            'status' => 200,
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            $data = [
                'message' => 'Categoria no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|unique:categorias,nombre',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $categoria->nombre = $request->nombre;
        $categoria->save();
        $data = [
            'message' => 'Categoria actualizada',
            'categoria' => $categoria,
            'status' => 200,
        ];


        return response()->json($data, 200);
    }
}
