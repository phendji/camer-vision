<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('propositions')){
            Schema::create('propositions', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('id_user')->unique()->nullable();
                $table->foreign('id_user')->references('id')->on('users');
                $table->integer('id_theme');
                $table->string('problematique');
                $table->string('solution');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('propositions');
    }
}
