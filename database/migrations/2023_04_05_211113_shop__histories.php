<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
        /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('faction')->create('shop__histories', function(Blueprint $table) {
            $table->id();
            $table->string('uuid');
            $table->string('payment');
            $table->double('price');
            $table->integer('item_id');
            $table->boolean('is_claimed')->default(false);
            $table->string('origin', 15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop__histories');
    }
};
