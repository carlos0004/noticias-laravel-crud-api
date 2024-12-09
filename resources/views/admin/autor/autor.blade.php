@extends('admin.adminLayout')

@push('scripts')
@vite(['resources/js/admin/autor.js']) <!-- Cargar estilos específicos para la seccion de autor -->
@endpush

@section('main')
<div class="main-menu">
    <h1>Autores</h1>
    <button class="btn btn-primary">Primary button</button>

</div>
<div id="myGrid" class="ag-theme-quartz" style="height: 300px"></div>


@endsection