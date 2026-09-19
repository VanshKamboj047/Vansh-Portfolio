<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePojectRequest extends FormRequest
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
            'title'=>'required|string|max:255',
            'short_description'=>'required|string|max:255',
            'description'=>'required|string',
            'image' => 'nullable|image|max:2048',
            'project_link' => 'nullable|url',
            'is_featured' => 'boolean',
            'display_order' => 'integer',
        ];
    }
}
