<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services=Service::orderBy('id')->get();
        return response()->json([
            'success'=>true,
            'data'=>$services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $data=$request->validated();
        if($request->hasFile('icon')){
            $data['icon']=$request->file('icon')->store('service_icon','public');
        }
        $services=Service::create($data);

        return response()->json([
            'success'=>true,
            'data'=>$services
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service=Service::findOrFail($id);
        return response()->json([
            'success'=>true,
            'data'=>$service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, string $id)
    {
        $data=$request->validated();
        $service=Service::findOrFail($id);
        if($request->hasfile('icon')){
            if($service->icon){
                Storage::disk('public')->delete($service->icon);
            }
            $data['icon']=$request->file('icon')->store('service_icon', 'public');
        }
        $service->update($data);
        
        return response()->json([
            'success'=>true,
            'data'=>$service,
            'message'=>"Services Updated Successfully"
        ]);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service=Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Service deleted Successfully'
        ]);
    }
}
