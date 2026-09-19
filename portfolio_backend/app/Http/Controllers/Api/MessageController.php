<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageController;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $message=Message::orderBy('created_at','desc')->get();
        return response()->json([
            'success'=>true,
            'data'=>$message
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $data=$request->validated();
        $message=Message::create($data);

        return response()->json([
            'success'=>true,
            'data'=>$message,
            'message'=>'Message Created Successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $message=Message::findOrFail($id);
        return response()->json([
            'success'=>true,
            'data'=>$message
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id)
    {

        $message=Message::findOrFail($id);
        $message->is_read=true;
        $message->save();

        return response()->json([
            'success'=>true,
            'data'=>$message,
            'message'=>'Message Marked as Read'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message=Message::findOrFail($id);
        $message->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Message deleted Successfully'
        ]);
    }
}
