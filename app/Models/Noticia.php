<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Noticia extends Model {
    //
    protected $table = "noticias";
    protected $fillable = [
        'titulo',
        'id_autor',
        'id_categoria',
        'contenido',
    ];
    public $timestamps = false;

    public function categoria() {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }

    public function autor() {
        return $this->belongsTo(Autor::class, 'id_autor');
    }
}
