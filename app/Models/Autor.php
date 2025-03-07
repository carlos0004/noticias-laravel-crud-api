<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model {
    //
    protected $table = "autores";
    protected $fillable = [
        'nombre',
    ];
    public $timestamps = false;
    public function noticias() {
        return $this->hasMany(Noticia::class, 'id_autor');
    }
}
