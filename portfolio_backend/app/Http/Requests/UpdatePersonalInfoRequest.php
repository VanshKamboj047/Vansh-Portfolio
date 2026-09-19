<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonalInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'full_name' => 'required|string|max:255',
        'title' => 'required|string|max:255',
        'bio' => 'required|string',
        'email' => 'required|email',
        'phone' => 'nullable|string|max:20',
        'location' => 'nullable|string|max:255',
        'profile_image' => 'nullable|image|max:2048',
        'resume' => 'nullable|file|mimes:pdf|max:5120',
    ];
    }
}
