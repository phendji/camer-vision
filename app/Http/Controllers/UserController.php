<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $userService;

    /**
     * ImportService constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    protected function store(Request $request)
    {
        if (!$user = $this->userService->store($request->all())){
            return ResponseHelper::error('hpg.unsaved_hpg', 404);
        }
        return $this->index();
    }

    /**
     * @return mixed
     */
    protected function index()
    {
        if (!$list = $this->userService->index()){
            return ResponseHelper::error('hpg.empty_list', 404);
        }

        return ResponseHelper::success($list);
    }
}
