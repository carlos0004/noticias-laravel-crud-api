<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model {
    //
    protected $table = "categorias";

    protected $fillable = [
        'nombre',
    ];
    public $timestamps = false;

    public function noticias() {
        return $this->hasMany(Noticia::class, 'id_categoria');
    }
}
