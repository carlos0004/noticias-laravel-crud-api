<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Autor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AutorController extends Controller {
    public function index() {
        $autores = Autor::all();
        if ($autores->isEmpty()) {
            $data = [
                'message' => 'No se encontraron resultados',
                'status' => 200,
            ];
            return response()->json($data, 200);
        }
        $data = [
            'autores' => $autores,
            'status' => 200,
        ];
        return response()->json($data, 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|unique:autores,nombre',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $autor = Autor::create([
            'nombre' => $request->nombre,
        ]);

        if (!$autor) {
            $data = [
                'message' => 'Error al crear la autor',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        return response()->json($autor, 200);
    }

    public function show($id) {
        $autor = Autor::find($id);
        if (!$autor) {
            $data = [
                'message' => 'autor no encontrado',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $data = [
            'autor' => $autor,
            'status' => 200
        ];
        return response()->json($autor, 200);
    }

    public function delete($id) {
        $autor = Autor::find($id);
        if (!$autor) {
            $data = [
                'message' => 'autor no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }
        $autor->delete();
        $data = [
            'message' => 'autor eliminado',
            'status' => 200,
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $autor = Autor::find($id);
        if (!$autor) {
            $data = [
                'message' => 'autor no encontrada',
                'status' => '404'
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|unique:autores,nombre',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $autor->nombre = $request->nombre;
        $autor->save();
        $data = [
            'message' => 'autor actualizado',
            'autor' => $autor,
            'status' => 200,
        ];


        return response()->json($data, 200);
    }
}
