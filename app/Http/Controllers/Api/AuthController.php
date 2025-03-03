<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }
        $user = User::create($request->all());

        if (!$user) {
            $data = [
                'message' => 'Error al crear el usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        $token = $user->createToken($request->name);

        return [
            'user' => response()->json($user, 200),
            'token' => $token->plainTextToken
        ];
    }
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            $data = [
                'message' => 'Credenciales incorrectas',
                'status' => 400
            ];
            return response()->json($data, 400);
        }
        $token = $user->createToken($user->name);

        return [
            'user' => response()->json($user, 200),
            'token' => $token->plainTextToken
        ];
    }
    public function logOut(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Sesión cerrada',
            'status' => 200
        ]);
    }
}
