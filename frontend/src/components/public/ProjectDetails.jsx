import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/projectsApi";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await getProject(id);
                setProject(response.data.data);
            } catch (err) {
                setError('Project not found');
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    if (loading) return <p className="text-center py-10 text-gray-500">Loading project...</p>;
    if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

    return (
        <section className="py-16 px-6 max-w-3xl mx-auto">
            {project.image && (
                <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${project.image}`}
                    alt={project.title}
                    className="w-full h-72 object-cover rounded-xl mb-8"
                />
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

            <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

            {project.project_link && (
                <a
                    href={project.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                    View Project →
                </a>
            )}
        </section>
    );
}