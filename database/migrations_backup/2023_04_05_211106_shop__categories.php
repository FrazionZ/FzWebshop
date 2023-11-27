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
        Schema::connection('faction')->create('economy__shop_type', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('singular_name');
            $table->boolean('is_enable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop__categories');
    }
};
