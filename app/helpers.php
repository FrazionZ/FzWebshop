<?php

use App\Models\FactionProfile;

if (!function_exists('getFZProfile')){
    function getFZProfile(){
        $profile = FactionProfile::where('uuid', '=', Auth::user()->uuid)->first();
        return $profile;
    }
}