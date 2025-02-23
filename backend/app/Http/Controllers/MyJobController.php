<?php

namespace App\Http\Controllers;

use App\Models\MyJob;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class MyJobController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $myjobs = MyJob::orderBy('created_at', 'desc')->get();
        return response()->json($myjobs);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            $myjob = MyJob::create($request->all());
            return response()->json($myjob, 201);
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') { // Unique constraint violation
                return response()->json(['message' => 'A job with the same company and title already exists.'], 400);
            }
            return response()->json(['message' => 'Failed to create job'], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create job'], 500);
        }
    }

    // Display the specified resource.
    public function show($id)
    {
        $myjob = MyJob::findOrFail($id);
        return response()->json($myjob);
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $myjob = MyJob::findOrFail($id);
        $myjob->update($request->all());
        return response()->json($myjob);
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        $myjob = MyJob::findOrFail($id);
        $myjob->delete();
        return response()->json(null, 204);
    }
}
