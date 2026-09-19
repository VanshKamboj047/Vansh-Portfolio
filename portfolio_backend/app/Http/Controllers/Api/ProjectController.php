<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePojectRequest;
use App\Http\Requests\UpdatePojectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::orderBy('display_order')->get();
        return response()->json([
            'success'=>true,
            'data'=>$projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePojectRequest $request)
    {
        $data = $request->validated();
        if($request->hasFile('image')){
            $data['image']=$request->file('image')->store('projects','public');
        }
        $project =Project::create($data);

        return response()->json([
            'success'=>true,
            'data'=>$project,
            'message'=>'Project Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project=Project::findOrFail($id);

        return response()->json([
            'success'=>true,
            'data'=>$project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePojectRequest $request, string $id)
    {
        $project=Project::findOrFail($id);
        $data=$request->validated();

        if($request->hasfile('image')){
            if($project->image){
                Storage::disk('public')->delete($project->image);
            }
            $data['image']=$request->file('image')->store('projects', 'public');
        }
        $project->update($data);

        return response()->json([
            'success'=>true,
            'data'=>$project,
            'message'=>'Project Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project=Project::findOrFail($id);

        if($project->image){
            Storage::disk('public')->delete($project->image);

        }
        $project->delete();
        return response([
            'success'=>true,
            'message'=>'Project deleted Successfully'
        ]);
    }
}
