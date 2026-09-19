<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificationRequest;
use App\Http\Requests\UpdateCertificationRequest;
use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certification=Certification::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$certification
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificationRequest $request)
    {
        $data=$request->validated();
        if($request->hasFile('certificate_image')){
            $data['certificate_image']=$request->file('certificate_image')->store('certificate','public');
        }
        $certification=Certification::create($data);

        return response()->json([
            'success'=>true,
            'data'=>$certification,
            'message'=>'Certificate Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $certificate=Certification::findOrFail($id);

        return response()->json([
            'success'=>true,
            'data'=>$certificate,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificationRequest $request, string $id)
    {
        $data=$request->validated();
        $certificate=Certification::findOrFail($id);
        
        if($request->hasfile('certificate_image')){
            if($certificate->certificate_image){
                Storage::disk('public')->delete($certificate->certificate_image);
            }
            $data['image']=$request->file('image')->store('certificate', 'public');
        }

        $certificate->update($data);
        return response()->json([
            'success'=>true,
            'data'=>$certificate,
            'message'=>'Certificate Update Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $certificate=Certification::findOrFail($id);
         if($certificate->certificate_image){
            Storage::disk('public')->delete($certificate->certificate_image);
         }
        $certificate->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Certificate deleted Successfully'
        ]);

    }
}
