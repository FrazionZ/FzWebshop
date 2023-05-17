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
        Schema::create('shop__items', function(Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->double('price_pbs')->default(0)->nullable();
            $table->double('price_coins')->default(0)->nullable();
            $table->boolean('multiple_buy')->default(true);
            $table->string('command')->nullable();
            $table->text('description')->nullable();
            $table->string('permission_needed')->nullable();
            $table->integer('item_requirement')->nullable();
            $table->string('permission')->nullable();
            $table->integer('category_id')->nullable();
            $table->string('custom_category_name')->nullable();
            $table->string('colors')->nullable();
            $table->integer('position')->default(0);
            $table->boolean('is_deleted')->default(false);
            $table->boolean('is_enable')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop__items');
    }
};
