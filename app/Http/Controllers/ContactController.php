<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\Contact;

class ContactController extends Controller
{
    // ref pour continuer : https://scotch.io/tutorials/ultimate-guide-on-sending-email-in-laravel
    /*public function send(Request $request)
    {
        $email      = $request->input('email');
        $nom        = $request->input('nom');
        $contenu    = $request->input('message');

        $data = ['email' =>$email, 'nom' =>$nom, 'contenu' =>$contenu];

        Mail::to($email)->send(new Contact($data));

        return response()->json(['message' => 'Request completed']);
    }*/

    public function send(Request $request)
    {
        $email      = $request->input('email');
        $nom        = $request->input('nom');
        $contenu    = $request->input('message');

        $user = ['email' =>$email, 'nom' =>$nom, 'contenu' =>$contenu];

        Mail::send('emails.contact', $user, function($message) use ($user) {
            $message->to('hendjipatrick@yahoo.fr');
            $message->subject('Mailgun Testing');
        });
        return "Votre email a été envoyer à camer-vision avec succès...";
    }
}
