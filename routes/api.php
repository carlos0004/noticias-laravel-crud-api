<?php

use App\Http\Controllers\Api\AutorController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\NoticiaController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

// Rutas para noticias
Route::get('/noticias', [NoticiaController::class, 'index']);
Route::get('/noticias/{id}', [NoticiaController::class, 'show']);
Route::post('/noticias', [NoticiaController::class, 'store']);
Route::put('/noticias/{id}', [NoticiaController::class, 'update']);
Route::patch('/noticias/{id}', [NoticiaController::class, 'updatePartial']);
Route::delete('/noticias/{id}', [NoticiaController::class, 'delete']);
// Rutas para Autores
// Route::middleware('auth:sanctum')->get('/autores', [AutorController::class, 'index']);
Route::get('/autores', [AutorController::class, 'index'])->middleware('auth:sanctum');
Route::get('/autores/{id}', [AutorController::class, 'show']);
Route::post('/autores', [AutorController::class, 'store']);
Route::put('/autores/{id}', [AutorController::class, 'update']);
Route::patch('/autores/{id}', [AutorController::class, 'updatePartial']);
Route::delete('/autores/{id}', [AutorController::class, 'delete']);


// Rutas para Categorías
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'show']);
Route::post('/categorias', [CategoriaController::class, 'store']);
Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
Route::patch('/categorias/{id}', [CategoriaController::class, 'updatePartial']);
Route::delete('/categorias/{id}', [CategoriaController::class, 'delete']);

// Autentications
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logOut'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
