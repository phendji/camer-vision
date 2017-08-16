<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    // ref pour continuer : https://scotch.io/tutorials/ultimate-guide-on-sending-email-in-laravel
    public function send(Request $request)
    {
        $title = $request->input('title');
        $content = $request->input('content');

        Mail::send('emails.contact', ['title' => $title, 'content' => $content], function ($message)
        {

            $message->from('hendji.officiel@gmail.com', 'Christian Nwamba');

            $message->to('hendjipatrick@yahoo.fr');

        });

        return response()->json(['message' => 'Request completed']);
    }
}
