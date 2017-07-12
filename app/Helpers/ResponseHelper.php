<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Response;

class ResponseHelper extends Response
{
    /**
     * @param int $status
     * @param null $data
     * @param array $headers
     * @return mixed
     */
    static public function success($data = null, $status = 200, $headers = [])
    {
        if ($data && is_string($data)) $data = trans($data) ?? $data;
        return Response::make($data, $status, $headers);
    }

    /**
     * @param null $code
     * @param int $status
     * @param null $errors
     * @param array $headers
     * @param null $failedRules
     * @return mixed
     */
    static public function error($code = null, $status = 500, $errors = null, $headers = [], $failedRules = null)
    {
        $param = [];

        if (is_array($code))
        {
            $param = $code[1];
            $code  = $code[0];
        }

        $response = [];

        if ($code != null)
        {
            $response['code'] = $code;
            $response['message'] = trans($code, $param);
        }

        if ($errors != null)
        {
            $response['details'] = $errors;
        }

        if ($failedRules != null)
        {
            $response['failedRules'] = $failedRules;
        }

        return Response::make($response, $status, $headers);
    }
}