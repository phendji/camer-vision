<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropositionsIpadresses extends Model
{

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'proposition_id', 'ip_address', 'type'
  ];
}
