<?php

namespace App\Services;

use App\Models\Proposition;
use App\Models\PropositionsIpadresses;

/**
 * Created by PhpStorm.
 * User: Patrick Hendji
 * Date: 19/08/2017
 */
class PropositionService
{

    /**
     * List data
     */
    public function index()
    {
        return Proposition::with('user')
            ->whereNotNull('id_user')
            ->withCount([
                'views' => function ($query) {
                   $query->where('type', 'view');
                },
               'likes' => function ($query) {
                   $query->where('type', 'like');
                }])
            ->get();
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

    /**
     * Update proposition
     */
    public function updateLike($id, $ip_address)
    {   
        $existingLike = PropositionsIpadresses::where('proposition_id', $id)->where('ip_address', $ip_address)->where('type', 'like')->first();

        if(!$existingLike){
           return PropositionsIpadresses::create(['proposition_id' => $id, 'ip_address' => $ip_address, 'type' => 'like']);
        }

        return false;
    }

    /**
     * Update proposition
     */
    public function updateView($id, $ip_address)
    {   
        $existingView = PropositionsIpadresses::where('proposition_id', $id)->where('ip_address', $ip_address)->where('type', 'view')->first();

        if(!$existingView){
           return PropositionsIpadresses::create(['proposition_id' => $id, 'ip_address' => $ip_address, 'type' => 'view']);
        }

        return false;
    }
}