<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $education = Education::orderBy('start_date', 'desc')->get();
        return response()->json([
            'success'=>true,
            'data'=>$education,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEducationRequest $request)
    {
        $data=$request->validated();
        $education=Education::create($data);
        return response()->json([
            'success'=>true,
            'data'=>$education,
            'message'=>'Education Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $education=Education::findOrFail($id);
        return response()->json([
            'success'=>true,
            'data'=>$education,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEducationRequest $request, string $id)
    {
        $education=Education::findOrFail($id);
        $data=$request->validated();

        $education->update($data);
        return response()->json([
            'success'=>true,
            'data'=>$education,
            'message'=>'Education Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $education=Education::findOrFail($id);
        $education->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Education Deleted Successfully'
        ]);
    }
}
