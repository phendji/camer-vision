<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposition extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'id_user','id_theme', 'problematique', 'solution','status'
    ];

    /**
     * Relation  qui presente la clés etrangère id_user vers la table user.
     *
     * @var array
     */
    public function user() {
      return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Relation qui presente la clés etrangère id_user vers la table user.
     *
     * @var array
     */
    public function likes() {
      return $this->hasMany(PropositionsIpadresses::class);
    }

    /**
     * Relation qui presente la clés etrangère id_user vers la table user.
     *
     * @var array
     */
    public function views() {
      return $this->hasMany(PropositionsIpadresses::class);
    }
}
