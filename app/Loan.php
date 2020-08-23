<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $guarded = ["id", "created_at", "updated_at"];

    public function clients(){
        return $this->belongsTo("App\Client", "id_client");
    }
    public function payments(){
        return $this->hasMany("App\Payment", "id_loan");
    }
}
