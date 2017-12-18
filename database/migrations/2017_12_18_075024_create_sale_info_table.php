<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSaleInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_info', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',20);
            $table->uuid('uuid');
            $table->string('origin',30)->nullable();
            $table->integer('money')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->text('detail')->nullable();
            $table->string('attachment_url',100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sale_info');
    }
}
