<?php

namespace App\Http\Controllers;

use App\Models\ShopSubscribeCategories;
use App\Models\ShopSubscribeFeatures;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscribeController extends Controller
{
    

    public function index(Request $request){
        $subscribeCategories = ShopSubscribeCategories::get();
        foreach($subscribeCategories as $sc)
            $sc->features = json_decode($sc->features, true); 
        $subscribeFeatures = ShopSubscribeFeatures::get();
        return Inertia::render('Subscribe/Index', [
            'subscribeCategories' => $subscribeCategories,
            'subscribeFeatures' => $subscribeFeatures
        ]);
    }

    public function details($id){
        $subscribe = ShopSubscribeCategories::where('id', $id)->first();
        return Inertia::render('Subscribe/Details', [
            'subscribe' => $subscribe
        ]);
    }


}
