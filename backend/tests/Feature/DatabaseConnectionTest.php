<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class DatabaseConnectionTest extends TestCase
{
    /** @test */
    public function it_uses_sqlite_for_testing()
    {
        $connection = DB::connection()->getPDO()->getAttribute(\PDO::ATTR_DRIVER_NAME);
        $this->assertEquals('sqlite', $connection);
    }
}
