import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getServices, createService, updateService, deleteService } from "../../api/servicesApi";

const emptyForm = { title: '', description: '' };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [iconFile, setIconFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const response = await getServices();
      setServices(response.data.data);
    } catch (err) {
      setError('Failed to load services');
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
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (iconFile) {
      data.append('icon', iconFile);
    }

    try {
      if (editingId) {
        await updateService(editingId, data);
      } else {
        await createService(data);
      }
      resetForm();
      fetchServices();
    } catch (err) {
      setError('Failed to save service');
    }
  }

  function resetForm() {
    setFormData(emptyForm);
    setIconFile(null);
    setEditingId(null);
  }

  function handleEdit(service) {
    setFormData({ title: service.title, description: service.description });
    setEditingId(service.id);
    setIconFile(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      fetchServices();
    } catch (err) {
      setError('Failed to delete service');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
              <div className="flex gap-3">
                {service.icon && (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${service.icon}`}
                    alt={service.title}
                    className="w-10 h-10 object-contain"
                  />
                )}
                <div>
                  <p className="font-semibold">{service.title}</p>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(service)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}