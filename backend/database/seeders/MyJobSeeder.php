<?php

namespace Database\Seeders;

use App\Models\MyJob;
use Illuminate\Database\Seeder;

class MyJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MyJob::factory()->count(50)->create();
    }
}
