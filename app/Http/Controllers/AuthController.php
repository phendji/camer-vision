<?php
/**
 * Created by PhpStorm.
 * User: flore
 * Date: 30/10/2016
 * Time: 19:21
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['error' => 'user_not_found'], 500);
        }
        if (!$user->admin && $user->speaker && $user->organizer->state == 0) {
            return response()->json(['error' => 'organizer_closed'], 500);
        }
        if ($user->speaker) {
            $user->organizer;
        }
        return response()->json(compact('user'));
    }
}