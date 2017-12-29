<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteSalePlanCustomerIdColunmTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sale_plan', function (Blueprint $table) {
            $table->dropColumn('customer_id');
            $table->date('act_time')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sale_plan', function (Blueprint $table) {
            $table->string('customer_id');
            $table->dropColumn('act_time');
            $table->dropSoftDeletes();
        });
    }
}
