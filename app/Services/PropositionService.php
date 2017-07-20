<?php

namespace App\Services;

use App\Models\Proposition;

/**
 * Created by PhpStorm.
 * User: Florent SEJOUR
 * Date: 19/05/2017
 * Time: 17:38
 */
class PropositionService
{

    /**
     * List data
     */
    public function index()
    {
        return Proposition::all();
    }

    /**
     * List data
     */
    public function getId($id)
    {
        return Proposition::find($id);
    }

    /**
     * Update data
     *
     * @param $data
     * @return Proposition
     */
    public function store($data)
    {
        if (isset($data['id'])){
            $proposition = Proposition::find($data['id']);
            $proposition->update($data);
        } else {
            $proposition = Proposition::create($data);
        }
        return $proposition;
    }
}