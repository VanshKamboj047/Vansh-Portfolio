<?php

use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CertificationController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\PersonalInfoController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\SocialProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/skills',[SkillController::class, 'index']);
Route::get('/skills/{id}',[SkillController::class,'show']);

Route::get('/projects',[ProjectController::class, 'index']);
Route::get('/projects/{id}',[ProjectController::class,'show']);

Route::get('/personal-info',[PersonalInfoController::class,'show']);

Route::get('/experiences',[ExperienceController::class, 'index']);
Route::get('/experiences/{id}',[ExperienceController::class,'show']);

Route::get('/educations',[EducationController::class, 'index']);
Route::get('/educations/{id}',[EducationController::class,'show']);

Route::get('/services',[ServiceController::class, 'index']);
Route::get('/services/{id}',[ServiceController::class,'show']);

Route::get('/achievements',[AchievementController::class, 'index']);
Route::get('/achievements/{id}',[AchievementController::class,'show']);

Route::get('/social-profiles',[SocialProfileController::class, 'index']);
Route::get('/social-profiles/{id}',[SocialProfileController::class,'show']);

Route::get('/certifications',[CertificationController::class, 'index']);
Route::get('/certifications/{id}',[CertificationController::class,'show']);

Route::post('/messages',[MessageController::class,'store']);

Route::post('/login',[AuthController::class,'login']);



Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout',[AuthController::class,'logout']);

    Route::post('/personal-info/update',[PersonalInfoController::class,'update']);

    Route::post('/skills',[SkillController::class,'store']);
    Route::put('/skills/{id}',[SkillController::class,'update']);
    Route::delete('/skills/{id}',[SkillController::class,'destroy']);

    Route::post('/projects',[ProjectController::class,'store']);
    Route::put('/projects/{id}',[ProjectController::class,'update']);
    Route::delete('/projects/{id}',[ProjectController::class,'destroy']);

    Route::post('/experiences',[ExperienceController::class,'store']);
    Route::put('/experiences/{id}',[ExperienceController::class,'update']);
    Route::delete('/experiences/{id}',[ExperienceController::class,'destroy']);

    Route::post('/educations',[EducationController::class,'store']);
    Route::put('/educations/{id}',[EducationController::class,'update']);
    Route::delete('/educations/{id}',[EducationController::class,'destroy']);

    Route::post('/services',[ServiceController::class,'store']);
    Route::put('/services/{id}',[ServiceController::class,'update']);
    Route::delete('/services/{id}',[ServiceController::class,'destroy']);

    Route::post('/achievements',[AchievementController::class,'store']);
    Route::put('/achievements/{id}',[AchievementController::class,'update']);
    Route::delete('/achievements/{id}',[AchievementController::class,'destroy']);

    Route::post('/social-profiles',[SocialProfileController::class,'store']);
    Route::put('/social-profiles/{id}',[SocialProfileController::class,'update']);
    Route::delete('/social-profiles/{id}',[SocialProfileController::class,'destroy']);

    Route::post('/certifications',[CertificationController::class,'store']);
    Route::put('/certifications/{id}',[CertificationController::class,'update']);
    Route::delete('/certifications/{id}',[CertificationController::class,'destroy']);

    Route::get('/messages',[MessageController::class, 'index']);
    Route::get('/messages/{id}',[MessageController::class,'show']);
    Route::put('/messages/{id}',[MessageController::class,'update']);
    Route::delete('/messages/{id}',[MessageController::class,'destroy']);

    
});

