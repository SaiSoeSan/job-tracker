<?php

namespace Database\Factories;

use App\Models\MyJob;
use Illuminate\Database\Eloquent\Factories\Factory;

class MyJobFactory extends Factory
{
    protected $model = MyJob::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company' => $this->faker->company,
            'job_title' => $this->faker->jobTitle,
            'applied_from' => fake()->randomElement(['Indeed', 'Direct_Email', 'Glassdoor', 'LinkedIn']),
            'application_link' => $this->faker->url,
            'note' => $this->faker->paragraph,
        ];
    }
}
