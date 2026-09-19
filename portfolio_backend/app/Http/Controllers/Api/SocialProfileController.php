<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSocialProfileRequest;
use App\Http\Requests\UpdateSocialProfileRequest;
use App\Models\SocialProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialProfile=SocialProfile::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$socialProfile
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocialProfileRequest $request)
    {
        $data=$request->validated();
         if($request->hasFile('icon')){
            $data['icon']=$request->file('icon')->store('socialProfile_icon','public');
        }
        $socialProfile=SocialProfile::create($data);
        return response()->json([
            'success'=>true,
            'data'=>$socialProfile,
            'message'=>'Social Profile Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $socialProfile=SocialProfile::findOrFail($id);
        return response()->json([
            'success'=>true,
            'data'=>$socialProfile
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocialProfileRequest $request, string $id)
    {
        $data=$request->validated();
        $socialProfile=SocialProfile::findOrFail($id);
        if($request->hasfile('icon')){
            if($socialProfile->icon){
                Storage::disk('public')->delete($socialProfile->icon);
            }
            $data['icon']=$request->file('icon')->store('socialProfile_icon', 'public');
        }
        $socialProfile->update($data);

        return response()->json([
            'success'=>true,
            'data'=>$socialProfile,
            'message'=>'Social Profile Updated Successfully'
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $socialProfile=SocialProfile::findOrFail($id);
        $socialProfile->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Social Profile deleted Successfully'
        ]);
    }
}
