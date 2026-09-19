<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePersonalInfoRequest;
use App\Models\PersonalInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PersonalInfoController extends Controller
{
    public function show(){
        $info=PersonalInfo::first();
        
        return response()->json([
            'success'=>true,
            'data'=>$info
        ]);
    }

    public function update(UpdatePersonalInfoRequest $request){
        $info=PersonalInfo::first();
        $data=$request->validated();

        if($request->hasfile('profile_image')){
            if($info && $info->profile_image){
                Storage::disk('public')->delete($info->profile_image);
            }
            $data['profile_image']=$request->file('profile_image')->store('profile','public');
        }

        if($request->hasfile('resume')){
            if($info && $info->resume_path){
                Storage::disk('public')->delete($info->resume_path);
            }
            $data['resume_path']=$request->file('resume')->store('resume','public');
        }
        if($info){
            $info->update($data);
        }
        else{
            $info=PersonalInfo::create($data);
        }

        return response()->json([
            'success'=>true,
            'data'=>$info,
            'message'=>'Personal Info Updated Successfully'
        ]);

    }
}
