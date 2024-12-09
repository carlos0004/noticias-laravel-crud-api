@extends('admin.adminLayout')

@section('main')
    @foreach ($categorias as $categoria)
    {{$categoria->id . ' - ' . $categoria->nombre }}<br>
    @endforeach
@endsection
