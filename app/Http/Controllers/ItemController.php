<?php

namespace App\Http\Controllers;

use App\Models\FactionProfile;
use App\Models\ShopCategories;
use App\Models\ShopHistory;
use App\Models\ShopItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ItemController extends Controller
{
    

    public function index(Request $request, $slug, $itemID){
        $category = ShopCategories::where('name', 'like', '%'.$slug.'%')->where('is_enable', 1)->first();
        if($category == null) abort(404);
        $item = ShopItems::where('id', '=', $itemID)->where('is_enable', 1)->where('is_deleted', 0)->where('shop_type_id', '=', $category->id)->first();
        if($item == null) abort(404);
        $factionProfile = FactionProfile::where('uuid', $request->user()->uuid)->first();
        return Inertia::render('Item/Show', [
            'category' => $category,
            'item' => $item,
            'factionProfile' => $factionProfile
        ]);
    }

    public function buy(Request $request) {
        if(!env('SHOP_STATE', true))
            return response()->redirectTo(route('index'));
        $userAuth = $request->user();
        $fzProfile = FactionProfile::where('uuid', '=', $userAuth->uuid)->first();
        $payment = $request->input('type');
        $item = ShopItems::where('id', '=', $request->input('item_id'))->where('is_enable', 1)->where('is_deleted', 0)->first();
        if($item == null) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Cette article semble introuvable'));
        $category = ShopCategories::where('id', $item->shop_type_id)->where('is_enable', 1)->first();
        if($category == null)  return redirect()->back()->with("status", $this->toastResponse('error', 'Cette article semble introuvable'));
        if($item->multiple_buy == 0 && ShopHistory::where('uuid', '=', $userAuth->uuid)->where('item_id', '=', $item->id)->first() !== null)
            return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Vous ne pouvez acheter qu\'une seul fois cet article'));
        if($item->item_requirement !== null){
            $itemRequirement = ShopItems::where('id', '=', $item->item_requirement)->first();
            if(ShopHistory::where('uuid', '=', $userAuth->uuid)->where('item_id', '=', $itemRequirement->id)->first() == null)
                return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Vous devez acheter l\'item "'.$itemRequirement->name.'" avant celui-ci.'));
        }
        if($payment == "pbs"){
            $moneyOld = $userAuth->money;
            $price = $item->price_pbs;
            if($price <= -1)
                return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Ce moyen de paiement est désactivé'));
            if($moneyOld >= $price){
                $moneyNew = ($moneyOld) - ($price);
                $userAuth->update(['money' => $moneyNew]);
                $history = $this->fillHistory($userAuth->uuid, $payment, $item);
                $this->sendSocketServer($history);
                return redirect()->back()->with('result', true)->with("status", $this->toastResponse('success', 'Votre achat a bien été réalisé, connectez-vous au serveur pour le claim !'));
            }else
                return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Vous n\'avez pas assez de points boutique pour effectuer cette achat !'));
        }else if($payment == "coins"){
            $moneyOld = $fzProfile->money;
            $price = $item->price_coins;
            if($price <= -1)
                return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Ce moyen de paiement est désactivé'));
            if($moneyOld >= $price){
                $moneyNew = ($moneyOld) - ($price);
                $fzProfile->update(['money' => $moneyNew]);
                $history = $this->fillHistory($userAuth->uuid, $payment, $item);
                $this->sendSocketServer($history);
                return redirect()->back()->with('result', true)->with("status", $this->toastResponse('success', 'Votre achat a bien été réalisé, connectez-vous au serveur pour le claim !'));
            }else
                return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', 'Vous n\'avez pas assez de coins pour effectuer cette achat !'));
        }
    }

    public function fillHistory($uuid, $payment, $item){
        return ShopHistory::create([
            "uuid" => $uuid,
            "payment" => $payment,
            "price" => (($payment == "pbs") ? $item->price_pbs : $item->price_coins),
            "item_id" => $item->id,
            "origin" => "website",
        ]);
    }

    public function sendSocketServer($history){
        $client = new \WebSocket\Client("ws://194.9.172.246:".env('FZ_WEBSOCKET_PORT', 4670)."/v1/ws/shop/claim", [
            'headers' => [
                'Sec-WebSocket-Version' => '13',
                'origin' => '*',
                'key' => env('FZ_WEBSOCKET_KEY', "change_me")
            ],
        ]);
        $history->fzProfile = FactionProfile::select('uuid', 'money')->where('uuid', '=', Auth::user()->uuid)->first();
        $history->fzProfile->money = intval($history->fzProfile->money);
        $client->send(json_encode($history));
        $client->receive();
        $client->close();
    }


}
