<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Omnipay\Omnipay;
use App\Models\Payments;
use App\Models\CreditOffers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PayPalPaymentController extends Controller
{

    private $gateway;
    private $testMode;
   
    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');

        $this->testMode = true;

        $this->gateway->setClientId((($this->testMode) ? env('PAYPAL_SANDBOX_CLIENT_ID') : env('PAYPAL_CLIENT_ID')));
        $this->gateway->setSecret((($this->testMode) ? env('PAYPAL_SANDBOX_CLIENT_SECRET') : env('PAYPAL_CLIENT_SECRET')));
        $this->gateway->setTestMode($this->testMode); //set it to 'false' when go live
    }
   
    public function charge(CreditOffers $co)
    {
        try {
            $response = $this->gateway->purchase([
                'amount' => $co->price,
                'currency' => "EUR",
                'returnUrl' => route('credit.paypal.success'),
                'cancelUrl' => route('credit.paypal.error'),
            ])->send();
            
            $user = User::where('id', Auth::user()->id)->first();

            $dataRes = $response->getData();

            $payment = new Payments;
            $payment->payment_id = $dataRes['id'];
            $payment->payer_userid = $user->id;
            $payment->payer_offerid = $co->id;
            $payment->payer_type = "paypal";
            $payment->amount = $co->price;
            $payment->currency = "EUR";
            $payment->payment_status = "pending";
            $payment->save();

            $linkRedirect = "";
            foreach($response->getData()['links'] as $link) {
                if($link['rel'] == "approval_url")
                    $linkRedirect = $link['href'];
            }
        
            if ($response->isRedirect()) {
                return $response->redirect(); 
            } else {
                return $response->getMessage();
            }
        } catch(Exception $e) {
            
            return redirect()->route('credit.index')->with("status", $this->toastResponse('error', $e->getMessage()));
        }
    }
   
    /**
     * Charge a payment and store the transaction.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function success(Request $request)
    {
        // Once the transaction has been approved, we need to complete it.
        if ($request->input('paymentId') && $request->input('PayerID'))
        {
            $transaction = $this->gateway->completePurchase(array(
                'payer_id'             => $request->input('PayerID'),
                'transactionReference' => $request->input('paymentId'),
            ));
            $response = $transaction->send();
           
            if ($response->isSuccessful())
            {
                // The customer has successfully paid.
                $arr_body = $response->getData();
                $user = User::where('id', Auth::user()->id)->first();
                // Insert transaction data into the database
                $payment = new Payments;
                $transaction = $payment->where('payment_id', $arr_body['id'])->first();
                $offer = CreditOffers::select('money')->where('id', $transaction->payer_offerid)->first();
                if($transaction == null)
                    return redirect()->route('credit.index');
                if($transaction->payment_status == "approved")
                    return redirect()->route('credit.index');

                $transaction->update([
                    "payer_id" => $arr_body['payer']['payer_info']['payer_id'],
                    "payer_email" => $arr_body['payer']['payer_info']['email'],
                    "payment_status" => $arr_body['state'],
                ]);

                $moneyUpdate = ($user->money) + ($offer->money);

                $user->update(['money' => $moneyUpdate]);
           
                return redirect()->route('credit.paypal.confirm', ['pid' => $arr_body['id']])->with('status', $this->toastResponse('success', 'Votre compte a bien été crédité'));
            } else {
                return redirect()->route('credit.index')->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
            }
        } else {
            return redirect()->route('credit.index')->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
        }
    }

    public function confirm(Request $request, $pid)
    {
        $payment = Payments::where('payment_id', $pid)->first();
        if($payment == null) return redirect()->route('credit.index')->with('status', $this->toastResponse('error', 'Une erreur est survenue lors de la confirmation du paiement.'));
        $payment->user = User::select('id', 'name')->where('id', $payment->payer_userid)->first();
        $payment->offer = CreditOffers::where('id', $payment->payer_offerid)->first();
        return Inertia::render('Credit/Confirm', [
            'payment' => $payment
        ]);
    }
   
    public function error(Request $request)
    {
        return redirect()->route('credit.index')->with("status", $this->toastResponse('error', 'Transaction annulée'));
    }

    
}
