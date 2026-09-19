import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getMessages, markAsRead, deleteMessage } from "../../api/messagesApi";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await getMessages();
      setMessages(response.data.data);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsRead(id) {
    try {
      await markAsRead(id);
      fetchMessages();
    } catch (err) {
      setError('Failed to update message');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      fetchMessages();
    } catch (err) {
      setError('Failed to delete message');
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white border rounded-xl p-4 ${
                msg.is_read ? 'border-gray-200' : 'border-black'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">
                    {msg.name}
                    {!msg.is_read && (
                      <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">New</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(msg.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="text-gray-700 text-sm mb-3">{msg.message}</p>

              <div className="space-x-3">
                {!msg.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(msg.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}