<?php

use App\Models\User;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        if(!User::where("email", "john.doe@gmail.com")->first()){
	        DB::table('users')->insert([
	            'nom' => "Doe",
	            'prenom' => "John",
	            'sexe' => "masculin",
	            'age' => "23",
	            'pays' => "Amerique",
	            'ville' => "New york",
	            'email' => 'john.doe@gmail.com',
	        ]);
	    }
    }
}
