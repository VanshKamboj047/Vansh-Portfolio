<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        $user = User::where('email', $credentials['email'])->first();
        
        if(!$user || !Hash::check($credentials['password'], $user->password)){
            throw ValidationException::withMessages([
                'email'=>['The Provided credentials are incorrect.'],
            ]);
        }
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success'=>true,
            'data'=>[
                'user'=>$user,
                'token'=>$token
            ],
            'message'=>'Login Successful'
        ]);
    }

    public function logout(){
        request()->user()->currentAccessToken()->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Logout Successful'
        ]);
    }
}
