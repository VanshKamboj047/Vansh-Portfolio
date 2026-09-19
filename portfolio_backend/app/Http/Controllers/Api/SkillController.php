<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills=Skill::all();

        return response()->json([
            'success'=>true,
            'data'=>$skills,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSkillRequest $request)
    {
        $skill=Skill::create($request->validated());

        return response()->json([
            'success'=>true,
            'data'=>$skill,
            'message'=>'Skill Created Successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $skill=Skill::findOrFail($id);

        return response()->json([
            'success'=>true,
            'data'=>$skill
        ]);
        
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSkillRequest $request, string $id)
    {
        $skill=Skill::findOrFail($id);
        $skill->update($request->validated());
        return response()->json([
            'success'=>true,
            'data'=>$skill,
            'message'=>'Skill Update Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill=Skill::findOrFail($id);
        $skill->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Skill deleted Successfully'
        ]);
    }
}
