import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSocialProfiles, createSocialProfile, updateSocialProfile, deleteSocialProfile } from "../../api/socialProfilesApi";

const emptyForm = { platform_name: '', url: '' };

export default function AdminSocialProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [iconFile, setIconFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const response = await getSocialProfiles();
      setProfiles(response.data.data);
    } catch (err) {
      setError('Failed to load social profiles');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setIconFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('platform_name', formData.platform_name);
    data.append('url', formData.url);
    if (iconFile) {
      data.append('icon', iconFile);
    }

    try {
      if (editingId) {
        await updateSocialProfile(editingId, data);
      } else {
        await createSocialProfile(data);
      }
      resetForm();
      fetchProfiles();
    } catch (err) {
      setError('Failed to save social profile');
    }
  }

  function resetForm() {
    setFormData(emptyForm);
    setIconFile(null);
    setEditingId(null);
  }

  function handleEdit(profile) {
    setFormData({ platform_name: profile.platform_name, url: profile.url });
    setEditingId(profile.id);
    setIconFile(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this social profile?')) return;
    try {
      await deleteSocialProfile(id);
      fetchProfiles();
    } catch (err) {
      setError('Failed to delete social profile');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Social Profiles</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Platform Name</label>
            <input
              type="text"
              name="platform_name"
              value={formData.platform_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Icon {editingId && '(leave empty to keep current)'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-gray-500 px-4 py-2 hover:text-black">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {profile.icon && (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${profile.icon}`}
                    alt={profile.platform_name}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div>
                  <p className="font-semibold">{profile.platform_name}</p>
                  <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {profile.url}
                  </a>
                </div>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(profile)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(profile.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}