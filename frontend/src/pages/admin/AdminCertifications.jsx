import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCertifications, createCertification, updateCertification, deleteCertification } from "../../api/certificationsApi";

const emptyForm = { title: '', issuer: '', issue_date: '', certificate_link: '' };

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, []);

  async function fetchCertifications() {
    try {
      const response = await getCertifications();
      setCertifications(response.data.data);
    } catch (err) {
      setError('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('issuer', formData.issuer);
    data.append('issue_date', formData.issue_date);
    data.append('certificate_link', formData.certificate_link);
    if (imageFile) {
      data.append('certificate_image', imageFile);
    }

    try {
      if (editingId) {
        await updateCertification(editingId, data);
      } else {
        await createCertification(data);
      }
      resetForm();
      fetchCertifications();
    } catch (err) {
      setError('Failed to save certification');
    }
  }

  function resetForm() {
    setFormData(emptyForm);
    setImageFile(null);
    setEditingId(null);
  }

  function handleEdit(cert) {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      certificate_link: cert.certificate_link || '',
    });
    setEditingId(cert.id);
    setImageFile(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await deleteCertification(id);
      fetchCertifications();
    } catch (err) {
      setError('Failed to delete certification');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Certifications</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Issuer</label>
            <input
              type="text"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Issue Date</label>
            <input
              type="date"
              name="issue_date"
              value={formData.issue_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Certificate Link</label>
            <input
              type="url"
              name="certificate_link"
              value={formData.certificate_link}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Certificate Image {editingId && '(leave empty to keep current)'}
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
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
              <div className="flex gap-3">
                {cert.certificate_image && (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${cert.certificate_image}`}
                    alt={cert.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{cert.title}</p>
                  <p className="text-sm text-gray-500">{cert.issuer} — {cert.issue_date}</p>
                  {cert.certificate_link && (
                    <a href={cert.certificate_link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(cert)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(cert.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}