<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experience=Experience::orderBy('start_date', 'desc')->get();

        return response()->json([
            'success'=>true,
            'data'=>$experience
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExperienceRequest $request)
    {
        $data=$request->validated();

        $experience=Experience::create($data);
        return response()->json([
            'success'=>true,
            'data'=>$experience,
            'message'=>'Experience Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $experience=Experience::findOrFail($id);

        return response()->json([
            'success'=>true,
            'data'=>$experience
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExperienceRequest $request, string $id)
    {
        $experience=Experience::findOrFail($id);
        $data=$request->validated();

        $experience->update($data);
        return response()->json([
            'success'=>true,
            'data'=>$experience,
            'message'=>"Experience Updated Successfully"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Experience deleted Successfully'
        ]);
    }
}
