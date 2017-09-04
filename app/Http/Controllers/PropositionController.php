<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Services\PropositionService;
use Illuminate\Http\Request;

class PropositionController extends Controller
{

    protected $propositionService;

    /**
     * ImportService constructor.
     * @param PropositionService $propositionService
     */
    public function __construct(PropositionService $propositionService)
    {
        $this->propositionService = $propositionService;
    }

    protected function store(Request $request)
    {
        if (!$proposition = $this->propositionService->store($request->all())){
            return ResponseHelper::error('hpg.unsaved_hpg', 404);
        }
        return $proposition;
    }

    /**
     * @return mixed
     */
    protected function index()
    {
        if (!$list = $this->propositionService->index()){
            return ResponseHelper::error('hpg.empty_list', 404);
        }

        return ResponseHelper::success($list);
    }

    
      /**
     * @return mixed null
     */
    protected function indexNull()
    {
        if (!$list = $this->propositionService->indexNull()){
            return ResponseHelper::error('hpg.empty_list', 404);
        }

        return ResponseHelper::success($list);
    }

    /**
     * Les Six propositions les plus likés dont le status est different de 0
     * @return mixed null
     */
    protected function propositionWithMostLike()
    {
      if (!$list = $this->propositionService->getSixPropositionsWithMostLike()){
        return ResponseHelper::error('hpg.empty_list', 404);
      }
      return ResponseHelper::success($list);
    }

    /**
     * Récuperer la liste des propositions ayant des id_user != NULL
     * @return mixed null
     */
    protected function propositionWithIdUserNotNull()
    {
      if (!$list = $this->propositionService->getPropositionWithIdUserNotNull()){
        return ResponseHelper::error('hpg.empty_list', 404);
      }
      return ResponseHelper::success($list);
    }

    /**
     *  Récuperer la liste des propositions ayant des id_user != NULL et status != 0
     * @return mixed null
     */
    protected function propositionWithIdUserAndStatusNotNull()
    {
      if (!$list = $this->propositionService->getPropositionWithIdUserAndStatusNotNull()){
        return ResponseHelper::error('hpg.empty_list', 404);
      }
      return ResponseHelper::success($list);
    }
    
    /**
     * Récuperer la liste des propositions ayant des id_user = NULL
     * @return mixed null
     */
    protected function propositionWithIdUserNull()
    {
      if (!$list = $this->propositionService->getPropositionWithIdUserNull()){
        return ResponseHelper::error('hpg.empty_list', 404);
      }
      return ResponseHelper::success($list);
    }

    /**
     * @return mixed
     */
    protected function getId($id)
    {
        if (!$proposition = $this->propositionService->getId($id)){
            return ResponseHelper::error('hpg.empty_list', 404);
        }

        return ResponseHelper::success($list);
    }

    /**
     * @return mixed
     */
    protected function updateLike($id)
    {
        //if (!$propositionIpaddress = $this->propositionService->updateLike($id, \Request::ip())){
        if (!$propositionIpaddress = $this->propositionService->updateLike($id, \Request::ip())){
            return ResponseHelper::success('hpg.unlike_proposition', 202);
        }

        return ResponseHelper::success($propositionIpaddress);
    }

    /**
     * @return mixed
     */
    protected function updateView($id)
    {

        //$ip_address = $_SERVER['HTTP_CLIENT_IP'];
        if (!$propositionIpaddress = $this->propositionService->updateView($id, \Request::ip())){
            return ResponseHelper::success('hpg.unlike_proposition', 202);
        }

        return ResponseHelper::success($propositionIpaddress);
    }

    /**
     * @return mixed
     */
    protected function updateStatus($id)
    {
        $this->propositionService->updateStatus($id);
        return ResponseHelper::success($id);
    }

}
