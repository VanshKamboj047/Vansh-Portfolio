import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getExperience, createExperience, updateExperience, deleteExperience } from "../../api/experienceApi";

const emptyForm = { company_name: '', role: '', start_date: '', end_date: '', description: '' };

export default function AdminExperience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperience();
  }, []);

  async function fetchExperience() {
    try {
      const response = await getExperience();
      setExperience(response.data.data);
    } catch (err) {
      setError('Failed to load experience');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (formData.end_date && formData.end_date < formData.start_date) {
        setError('End date cannot be before start date');
        return;   // yahin रोक do, API call mat karo
    }

    try {
        if (editingId) {
            await updateExperience(editingId, formData);
        } else {
            await createExperience(formData);
        }
        setFormData(emptyForm);
        setEditingId(null);
        fetchExperience();
    } catch (err) {
        setError('Failed to save experience');
    }
}

  function handleEdit(exp) {
    setFormData({
      company_name: exp.company_name,
      role: exp.role,
      start_date: exp.start_date,
      end_date: exp.end_date || '',
      description: exp.description,
    });
    setEditingId(exp.id);
  }

  function handleCancelEdit() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await deleteExperience(id);
      fetchExperience();
    } catch (err) {
      setError('Failed to delete experience');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Experience</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date (leave empty if current)</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="text-gray-500 px-4 py-2 hover:text-black">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">{exp.role} — {exp.company_name}</p>
                <p className="text-sm text-gray-500">{exp.start_date} to {exp.end_date || 'Present'}</p>
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(exp)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(exp.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}