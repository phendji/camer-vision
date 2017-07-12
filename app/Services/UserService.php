<?php

namespace App\Services;

use App\Models\User;

/**
 * Created by PhpStorm.
 * User: Florent SEJOUR
 * Date: 19/05/2017
 * Time: 17:38
 */
class UserService
{

    /**
     * List data
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Update data
     *
     * @param $data
     * @return User
     */
    public function store($data)
    {
        if (isset($data['id'])){
            $user = User::find($data['id']);
            $user->update($data);
        } else {
            $user = User::create($data);
        }
        return $user;
    }
}