import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "../../api/achievementsApi";

const emptyForm = { title: '', description: '', date: '' };

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const response = await getAchievements();
      setAchievements(response.data.data);
    } catch (err) {
      setError('Failed to load achievements');
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

    try {
      if (editingId) {
        await updateAchievement(editingId, formData);
      } else {
        await createAchievement(formData);
      }
      setFormData(emptyForm);
      setEditingId(null);
      fetchAchievements();
    } catch (err) {
      setError('Failed to save achievement');
    }
  }

  function handleEdit(achievement) {
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
    });
    setEditingId(achievement.id);
  }

  function handleCancelEdit() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await deleteAchievement(id);
      fetchAchievements();
    } catch (err) {
      setError('Failed to delete achievement');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Achievements</h1>

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
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
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
            rows="3"
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
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">{achievement.title}</p>
                <p className="text-sm text-gray-500">{achievement.date}</p>
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              </div>
              <div className="space-x-3 flex-shrink-0 ml-4">
                <button onClick={() => handleEdit(achievement)} className="px-4 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Edit</button>
                <button onClick={() => handleDelete(achievement.id)} className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}