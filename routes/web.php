<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/autores', function () {
    return view('admin.autor.autor');
})->name("autores");

Route::get('/categorias', function () {
    return view('admin.categoria.categoria');
})->name("categorias");

Route::get('/noticias', function () {
    return view('admin.noticia.noticia');
})->name("noticias");
