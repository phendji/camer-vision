<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('users')){
            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->int('id_proposition')->unique();
                $table->string('nom');
                $table->string('prenom');
                $table->string('age');
                $table->string('sexe');
                $table->string('pays');
                $table->string('ville');
                $table->string('email')->unique();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('propositions')){
            Schema::create('propositions', function (Blueprint $table) {
                $table->increments('id');
                $table->int('id_user')->unique();
                $table->int('id_theme');
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
        Schema::dropIfExists('users');
        Schema::dropIfExists('propositions');
    }
}
