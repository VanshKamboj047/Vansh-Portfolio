import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../../api/skillsApi";

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [skillNames, setSkillNames] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', category: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const response = await getSkills();
      setSkills(response.data.data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const names = skillNames
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) {
      setError('Enter at least one skill name');
      setSaving(false);
      return;
    }

    try {
      for (const name of names) {
        await createSkill({ name, category });
      }
      setCategory('');
      setSkillNames('');
      fetchSkills();
    } catch (err) {
      setError('Failed to save some skills');
    } finally {
      setSaving(false);
    }
  }

  function handleEditChange(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await updateSkill(editingId, editFormData);
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      setError('Failed to update skill');
    }
  }

  function handleEdit(skill) {
    setEditFormData({ name: skill.name, category: skill.category });
    setEditingId(skill.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (err) {
      setError('Failed to delete skill');
    }
  }

  const grouped = skills.reduce((groups, skill) => {
    const cat = skill.category || 'Other';
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(skill);
    return groups;
  }, {});

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Frontend"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Skill Names (comma-separated)
          </label>
          <input
            type="text"
            value={skillNames}
            onChange={(e) => setSkillNames(e.target.value)}
            placeholder="e.g. React, Tailwind, Bootstrap"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Adding...' : 'Add Skills'}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, catSkills]) => (
            <div key={cat} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{cat}</p>
              </div>
              <table className="w-full text-left text-sm">
                <tbody>
                  {catSkills.map((skill) => (
                    <tr key={skill.id} className="border-b border-gray-100 last:border-0">
                      {editingId === skill.id ? (
                        <td colSpan="2" className="px-4 py-3">
                          <form onSubmit={handleEditSubmit} className="flex gap-3 items-center">
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditChange}
                              required
                              className="flex-1 border border-gray-300 rounded px-2 py-1"
                            />
                            <input
                              type="text"
                              name="category"
                              value={editFormData.category}
                              onChange={handleEditChange}
                              required
                              className="flex-1 border border-gray-300 rounded px-2 py-1"
                            />
                            <button type="submit" className="text-green-600 hover:underline text-sm">Save</button>
                            <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:underline text-sm">Cancel</button>
                          </form>
                        </td>
                      ) : (
                        <>
                          <td className="px-4 py-3">{skill.name}</td>
                          <td className="px-4 py-3 space-x-3 text-right">
                            <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:underline text-sm">Edit</button>
                            <button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}