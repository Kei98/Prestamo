<?php

namespace App\Http\Controllers;

use App\Loan;
use App\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Payment::with("loans")->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            "id_loan" => "required",
            "amount" => "required",
            "date" => "required",
            "details" => "required"
        ]);

        $payment = Payment::create($fields);
        return response()->json("Se insertó correctamente", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        return ["payment" => $payment, "loan" => Loan::find($payment->id_loan)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        $fields = $request->validate([
            "id_loan" => "required",
            "amount" => "required",
            "date" => "required",
            "details" => "required"
        ]);

        $payment->update($fields);
        return response()->json("Se modificó correctamente", 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json("Se eliminó correctamente", 200);
    }
}
