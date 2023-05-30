<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopItems extends Model
{
    use HasFactory;
    
    protected $connection = "faction";
    protected $table = "economy__shop_item";
}
