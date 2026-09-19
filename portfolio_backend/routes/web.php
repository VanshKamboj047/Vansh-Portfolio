<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;




Route::get('/health', function () {
    return response()->json([
        'status' => 'ok'
    ]);
});

Route::get('/', function () {
    return view('welcome');
});



Route::get('/db-check', function () {
    try {
        DB::connection()->getPdo();

        return response()->json([
            'status' => 'ok',
            'message' => 'Database connected successfully'
        ]);
    } catch (\Throwable $e) {
        Log::error('DATABASE CONNECTION TEST FAILED', [
            'message' => $e->getMessage(),
        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Database connection failed'
        ], 500);
    }
});