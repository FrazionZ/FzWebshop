<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
class AuthController extends Controller
{
    

    public function start(Request $request){
        return redirect(env('FRAZION_PROVIDER_URL').'/login');
    }

    public function callback(Request $request){
        if($request->query('demandeConsent') == "true")
            return redirect()->route('auth.start');
        else {
            $response = Http::asForm()->post(env('FRAZION_PROVIDER_URL').'/token', [
                'grant_type' => 'authorization_code',
                'client_id' => env('FRAZION_CLIENT_ID'),
                'client_secret' => env('FRAZION_CLIENT_SECRET'),
                'redirect_url' => env('FRAZION_REDIRECT_URL'),
                'code' => $request->query('code'),
            ]);

            $data = $response->json();
            $user = Http::withHeaders([
                'Authorization' => 'Bearer ' . $data['access_token']
            ])->get(env('FRAZION_PROVIDER_DOMAIN').'/api/user');

            $userFind = User::where('id', $user['id'])->first();

            Auth::guard()->login($userFind, true);

            return redirect()->route('index');
        }
    }

}
