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
            ->get()->sortByDesc('likes_count')->sortByDesc('views_count')->values()->all();
    }

     /**
     * List data null
     */
    public function indexNull()
    {
        return Proposition::with('user')
            ->whereNull('id_user')
            ->get();
    }

    /**
     * TODO : Voir avec Florent car le sortByDesc ne marche pas
     * Obtenir six propositions pour la page home.html
     * Filtre : id_user!=null, les plus likés, status != 0 
     */
    public function getSixPropositionsWithMostLike()
    {
        return Proposition::with('user')
            ->whereNotNull('id_user')
            ->where('status', '<>', 0)
            ->withCount([
                'views' => function ($query) {
                   $query->where('type', 'view');
                },
               'likes' => function ($query) {
                   $query->where('type', 'like');
                }])
            ->limit(6)
            ->get()->sortByDesc('likes_count')->values()->all();
    }

    /**
     * Liste des propositions ayant un id_user <> null
     * Filtre : id_user <> null
     */
    public function getPropositionWithIdUserNotNull()
    {   
        return Proposition::with('user')
            ->whereNotNull('id_user')
            ->get();   
    }

     /**
     * Liste des propositions ayant un id_user null
     * Filtre : id_user is null
     */
    public function getPropositionWithIdUserNull()
    {   
        return Proposition::with('user')
            ->whereNull('id_user')
            ->get();   
    }

    /**
     * Liste des propositions ayant un id_user <> null et status <> 0
     * Filtre : id_user <> null et status <> 0
     */
    public function getPropositionWithIdUserAndStatusNotNull()
    {   
        return Proposition::with('user')
            ->whereNotNull('id_user')
            ->where('status', '<>', 0)
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