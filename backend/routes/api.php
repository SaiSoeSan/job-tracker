<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyJobController;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('myjobs', MyJobController::class);
    Route::post('logout', [AuthController::class, 'logout']);
});
