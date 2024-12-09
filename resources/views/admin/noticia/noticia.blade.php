@extends('admin.adminLayout')

@section('main')
@foreach ($noticias as $noticia)
{{$noticia->id . ' - ' . $noticia->titulo . ' - ' . $noticia->noticia . ' - ' . $noticia->categoria->nombre . ' - ' . $noticia->autor->nombre}}<br>
@endforeach
@endsection