<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',10);
            $table->string('tel',11)->nullable();
            $table->string('work',30)->nullable();
            $table->string('remark',255)->nullable();
            $table->string('pic_url',100)->nullable();
            $table->string('email',30)->nullable();
            $table->string('address',100)->nullable();
            $table->string('origin',20)->nullable();
            $table->string('QQ',15)->nullable();
            $table->date('birthday')->nullable();
            $table->uuid('uuid');
            $table->tinyInteger('phase')->nullable();
            $table->tinyInteger('type')->nullable();
            $table->tinyInteger('sex')->nullable();
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
        Schema::dropIfExists('customer');
    }
}
