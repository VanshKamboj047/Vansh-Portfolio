<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInfo extends Model
{
    use HasFactory;
    protected $table = 'profile_info';  

    protected $fillable = [
        'full_name', 'title', 'bio', 'profile_image',
        'email', 'phone', 'location', 'resume_path'
    ];
}
