<?php

use App\Http\Controllers\Api\AutorController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\NoticiaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas para noticias
Route::get('/noticias', [NoticiaController::class, 'index']);
Route::get('/noticias/{id}', function () {
    return 'Obtener una noticia';
});
Route::post('/noticias', function () {
    return 'Crear noticias';
});
Route::put('/noticias/{id}', function () {
    return 'Actualizar una noticia';
});
Route::delete('/noticias/{id}', function () {
    return 'Borrar una noticia';
});
// Rutas para Autores
Route::get('/autores', [AutorController::class, 'index']);
Route::get('/autores/{id}', [AutorController::class, 'show']);
Route::post('/autores', [AutorController::class, 'store']);
Route::put('/autores/{id}', [AutorController::class, 'update']);
Route::delete('/autores/{id}', [AutorController::class, 'delete']);


// Rutas para Categorías
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'show']);
Route::post('/categorias', [CategoriaController::class, 'store']);
Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
Route::delete('/categorias/{id}', [CategoriaController::class, 'delete']);
