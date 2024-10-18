import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectUser = () => {
  const [formData, setFormData] = useState({
    author: '',
    category: '',
    title: '',
    content: '',
    link: '',
    file: null,
    image: '',
    tags: '',
  });
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [comment, setComment] = useState(''); // Yorum için değişken
  const [showCommentInput, setShowCommentInput] = useState({}); // Yorum alanını kontrol etmek için

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Projeleri yüklerken hata:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (editingProject) {
        // Güncelleme işlemi
        await axios.put(`http://localhost:3001/api/projects/${editingProject}`, formDataToSend);
        setEditingProject(null);
      } else {
        // Yeni proje ekleme işlemi
        await axios.post('http://localhost:3001/api/projects', formDataToSend);
      }
      fetchProjects();
      setFormData({
        author: '',
        category: '',
        title: '',
        content: '',
        link: '',
        file: null,
        image: '',
        tags: '',
      });
    } catch (error) {
      console.error('Proje eklerken veya güncellerken hata:', error.response.data);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      author: project.author,
      category: project.category,
      title: project.title,
      content: project.content,
      link: project.link,
      file: project.file,
      image: project.image,
      tags: project.tags.join(', '), // Etiketleri virgülle ayırarak birleştir
    });
    setEditingProject(project._id); // Düzenleme moduna geç
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Proje silerken hata:', error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (projectId, e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/projects/${projectId}/comments`, { content: comment });
      setComment('');
      fetchProjects();
    } catch (error) {
      console.error('Yorum eklerken hata:', error.response.data);
    }
  };

  const toggleCommentInput = (projectId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [projectId]: !prev[projectId], // Yorum alanını aç/kapat
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Projeler</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded-lg shadow bg-white-100">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.content}</p>
            <p className="text-sm text-gray-500">Yazar: {project.author}</p>
            <p className="text-sm text-gray-500">Kategori: {project.category}</p>
            <p className="text-sm text-gray-500">Etiketler: {project.tags.join(', ')}</p>
            {project.image && <img src={project.image} alt={project.title} className="mt-2 w-full h-60" />}

            {/* Beğeni ve Yorum Butonları */}
            <div className="mt-2 flex items-center">
              <button
                onClick={async () => {
                  try {
                    await axios.put(`http://localhost:3001/api/projects/${project._id}/like`);
                    fetchProjects(); // Beğeni eklendikten sonra proje listesini yenile
                  } catch (error) {
                    console.error('Beğeni eklerken hata:', error.response.data);
                  }
                }}
                className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart mr-2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                Beğen
              </button>
              <span className="ml-2 text-sm text-gray-500">{project.likes} Beğeni</span>

              <button
                onClick={() => toggleCommentInput(project._id)}
                className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600 ml-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Yorum
              </button>
              <span className="ml-2 text-sm text-gray-500">{project.comments.length} Yorum</span>
              </div>

              {showCommentInput[project._id] && (
                <div className="mt-4">
                  <form onSubmit={(e) => handleCommentSubmit(project._id, e)} className="flex items-center">
                  <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Yorumunuzu yazın..."
                    className="flex-1 p-2 border rounded"
                    required
                  />
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2">
                    Paylaş
                  </button>
                </form>
                </div>
              )}
              {/* Yorumları Listele */}
            <div className="mt-4">
              {project.comments.map((comment) => (
                <div key={comment._id} className="p-2 border-b">
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectUser;
