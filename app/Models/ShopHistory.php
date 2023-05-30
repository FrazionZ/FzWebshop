<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopHistory extends Model
{
    use HasFactory;


    protected $connection = "faction";
    protected $table = "shop__histories";

    protected $fillable = [
        'uuid',
        'payment',
        'price',
        'item_id',
        'is_claim',
        'origin',
        'created_at',
        'updated_at',
    ];
}
