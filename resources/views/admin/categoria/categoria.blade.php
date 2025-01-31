@extends('admin.adminLayout')

@push('scripts')
@vite(['resources/js/admin/categoria.js']) <!-- Cargar estilos específicos para la seccion de autor -->
@endpush

@section('main')
<div class="main-menu">
    <h1>Categorias</h1>
    <button class="btn btn-primary">Primary button</button>

</div>
<div id="myGrid" class="ag-theme-quartz" style="height: 600px"></div>
@endsection