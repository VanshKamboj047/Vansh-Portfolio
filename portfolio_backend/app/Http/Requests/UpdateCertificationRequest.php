<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificationRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'issuer' => 'sometimes|required|string|max:255',
            'issue_date' => 'sometimes|required|date',
            'certificate_link' => 'sometimes|required|url:http,https',
            'certificate_image' => 'nullable|image|max:2048',
        ];
    }
}
