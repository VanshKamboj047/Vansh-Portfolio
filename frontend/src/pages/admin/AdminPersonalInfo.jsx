import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getPersonalInfo, updatePersonalInfo } from "../../api/personalInfoApi";

const emptyForm = {
  full_name: '', title: '', bio: '', email: '', phone: '', location: '',
};

export default function AdminPersonalInfo() {
  const [formData, setFormData] = useState(emptyForm);
  const [currentInfo, setCurrentInfo] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  async function fetchInfo() {
    try {
      const response = await getPersonalInfo();
      const info = response.data.data;
      if (info) {
        setCurrentInfo(info);
        setFormData({
          full_name: info.full_name || '',
          title: info.title || '',
          bio: info.bio || '',
          email: info.email || '',
          phone: info.phone || '',
          location: info.location || '',
        });
      }
    } catch (err) {
      setError('Failed to load personal info');
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
    setSuccess(false);
    setSaving(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profileImageFile) data.append('profile_image', profileImageFile);
    if (resumeFile) data.append('resume', resumeFile);

    try {
      await updatePersonalInfo(data);
      setSuccess(true);
      fetchInfo();
    } catch (err) {
      setError('Failed to save personal info');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Personal Info</h1>

      {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">Saved successfully!</p>}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} required rows="5" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image {currentInfo?.profile_image && '(leave empty to keep current)'}
            </label>
            {currentInfo?.profile_image && (
              <img
                src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${currentInfo.profile_image}`}
                alt="Current profile"
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
            )}
            <input type="file" accept="image/*" onChange={(e) => setProfileImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (PDF) {currentInfo?.resume_path && '(leave empty to keep current)'}
            </label>
            {currentInfo?.resume_path && (
              <a
                href={`${import.meta.env.VITE_STORAGE_BASE_URL}/${currentInfo.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-600 hover:underline mb-2"
              >
                View current resume
              </a>
            )}
            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </AdminLayout>
  );
}