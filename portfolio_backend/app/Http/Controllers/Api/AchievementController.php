<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAchievementRequest;
use App\Http\Requests\UpdateAchievementRequest;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $achievement=Achievement::orderBy('id')->get();

        return response()->json([
            'success'=>true,
            'data'=>$achievement
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAchievementRequest $request)
    {
        $data=$request->validated();
        $achievement=Achievement::create($data);

        return response()->json([
            'success'=>true,
            'data'=>$achievement
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $achievement=Achievement::findOrFail($id);
        return response()->json([
            'success'=>true,
            'data'=>$achievement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAchievementRequest $request, string $id)
    {
        $data=$request->validated();
        $achievement=Achievement::findOrFail($id);

        $achievement->update($data);
        return response()->json([
            'success'=>true,
            'data'=>$achievement,
            'message'=>'Achievements Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $achievement=Achievement::findOrFail($id);
        $achievement->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Achievement deleted Successfully'
        ]);
    }
}
