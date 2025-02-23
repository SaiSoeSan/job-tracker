<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('myjobs', function (Blueprint $table) {
            // Add unique constraint to the combination of company and job_title
            $table->unique(['company', 'job_title']);
            // Add soft deletes if not already added
            if (!Schema::hasColumn('myjobs', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('myjobs', function (Blueprint $table) {
            $table->dropUnique(['company', 'job_title']);
            $table->dropSoftDeletes();
        });
    }
};
