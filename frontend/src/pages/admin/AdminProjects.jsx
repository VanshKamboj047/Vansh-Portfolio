import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProjects, createProject, updateProject, deleteProject } from "../../api/projectsApi";

const emptyForm = {
  title: '',
  short_description: '',
  description: '',
  project_link: '',
  is_featured: false,
  display_order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await getProjects();
      setProjects(response.data.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('short_description', formData.short_description);
    data.append('description', formData.description);
    data.append('project_link', formData.project_link);
    data.append('is_featured', formData.is_featured ? 1 : 0);
    data.append('display_order', formData.display_order);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        await updateProject(editingId, data);
      } else {
        await createProject(data);
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      setError('Failed to save project');
    }
  }

  function resetForm() {
    setFormData(emptyForm);
    setImageFile(null);
    setEditingId(null);
  }

  function handleEdit(project) {
    setFormData({
      title: project.title,
      short_description: project.short_description,
      description: project.description,
      project_link: project.project_link || '',
      is_featured: !!project.is_featured,
      display_order: project.display_order,
    });
    setEditingId(project.id);
    setImageFile(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

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
          <label className="block text-sm font-medium mb-1">Short Description (for homepage card)</label>
          <input
            type="text"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Description (for details page)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Project Link</label>
          <input
            type="url"
            name="project_link"
            value={formData.project_link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <label className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Show on homepage (Featured)</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Project Image {editingId && '(leave empty to keep current)'}
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
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
              <div className="flex gap-3">
                {project.image && (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${project.image}`}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">
                    {project.title}
                    {project.is_featured ? (
                      <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">Featured</span>
                    ) : null}
                  </p>
                  <p className="text-sm text-gray-600">{project.short_description}</p>
                </div>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}