<?php

namespace App\Http\Controllers;

use App\Models\CreditOffers;
use App\Models\CreditOffersGateway;
use Illuminate\Http\Request;
use App\Models\CreditOffer;
use App\Models\CreditOfferGateway;
use App\Models\CreditGateway;
use App\Http\Controllers\PayPalPaymentController;
use Inertia\Inertia;

class CreditController extends Controller
{
    
    private $ppaymentController;

    public function __construct()
    {
        $this->ppaymentController = new PayPalPaymentController; //set it to 'false' when go live
    }

    public function index(Request $request){
        $creditGateway = new CreditGateway();
        $creditGateway = $creditGateway->get();
        return Inertia::render('Credit/Index', [
            'creditGateway' => $creditGateway
        ]);
    }

    public function offers($id){
        //CreditOfferGateway
        $creditOfferGateway = CreditOffersGateway::where('gateway_id', $id)->get();
        $creditOfferGateway->gateway = CreditGateway::where('id', $id)->first();
        foreach($creditOfferGateway as $cog){
            $cog->offers = CreditOffers::where('id', $cog->offer_id)->first();
        }
        return Inertia::render('Credit/Offers', [
            'creditOfferGateway' => $creditOfferGateway
        ]);
    }

    public function startPayment($id){
        //CreditOfferGateway
        $co = CreditOffers::where('id', $id)->first();
        $this->ppaymentController->charge($co);
    }

}
