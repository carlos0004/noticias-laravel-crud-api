@extends('layout')

@section('title', 'Panel de Administración')


@prepend('scripts')
@vite(['resources/js/admin/admin.js']) <!-- Cargar estilos específicos para el panel de administración -->
@endprepend

@section('body')
<header class="header">
    <div class="logo">LOGO</div>
    <label class="menu" for="menu">
        <input type="checkbox" id="menu">
        <span></span>
        <span></span>
        <span></span>
    </label>
    <div class="user">
        <img src="image.png" alt="">
    </div>
</header>

<section class="sidebar" id="sidebar">
    <a href="{{ route('categorias') }}" class="page {{ Route::is('categorias') ? 'active' : '' }}">
        <i class="fa-solid fa-house"></i>
        <div class="icon-text">Categoria</div>
    </a>
    <a href="{{ route('autores') }}" class="page {{ Route::is('autores') ? 'active' : '' }}">
        <i class="fa-solid fa-house"></i>
        <div class="icon-text">Autores</div>
    </a>
    <a href="{{ route('noticias') }}" class="page {{ Route::is('noticias') ? 'active' : '' }}">
        <i class="fa-solid fa-house"></i>
        <div class="icon-text">Noticias</div>
    </a>
</section>

<main class="main">
    @yield('main')
</main>
<footer>
    Footer
</footer>
@endsection