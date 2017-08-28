<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropositionsIpadressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('propositions_ipadresses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('proposition_id');
            $table->ipAddress('ip_address');
            $table->enum('type', ['like', 'view']);
            $table->unique(['proposition_id', 'ip_address', 'type']);
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
        Schema::dropIfExists('propositions_ipadresses');
    }
}
