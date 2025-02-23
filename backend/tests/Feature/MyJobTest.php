<?php

namespace Tests\Feature;

use App\Models\MyJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MyJobTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user and authenticate using Sanctum
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);
    }

    /** @test */
    public function it_can_list_all_myjobs()
    {
        MyJob::factory()->count(3)->create();

        $response = $this->getJson('/api/myjobs');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_create_a_myjob()
    {
        $data = [
            'company' => 'Test Company',
            'job_title' => 'Test Job Title',
            'applied_from' => 'Indeed',
            'application_link' => 'http://example.com',
            'note' => 'Test note',
        ];

        $response = $this->postJson('/api/myjobs', $data);

        $response->assertStatus(201)
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('myjobs', $data);
    }

    /** @test */
    public function it_can_show_a_myjob()
    {
        $myjob = MyJob::factory()->create();

        $response = $this->getJson('/api/myjobs/' . $myjob->id);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'company' => $myjob->company,
                'job_title' => $myjob->job_title,
            ]);
    }

    /** @test */
    public function it_can_update_a_myjob()
    {
        $myjob = MyJob::factory()->create();

        $data = [
            'company' => 'Updated Company',
            'job_title' => 'Updated Job Title',
        ];

        $response = $this->putJson('/api/myjobs/' . $myjob->id, $data);

        $response->assertStatus(200)
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('myjobs', $data);
    }

    /** @test */
    public function it_can_delete_a_myjob()
    {
        $myjob = MyJob::factory()->create();

        $response = $this->deleteJson('/api/myjobs/' . $myjob->id);

        $response->assertStatus(204);

        $this->assertSoftDeleted('myjobs', ['id' => $myjob->id]);
    }
}
