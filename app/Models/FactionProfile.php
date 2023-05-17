<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactionProfile extends Model
{
    use HasFactory;

    protected $connection = "faction";
    
    protected $table = "profile";

    protected $fillable = [
        'money'
    ];

    protected $primaryKey = 'uuid';

    public $timestamps = false;
}
