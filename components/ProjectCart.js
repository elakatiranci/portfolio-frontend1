// ProjectCart.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProjects } from '../store';

const ProjectCart = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
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
  const [editingProject, setEditingProject] = useState(null);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState({});

  useEffect(() => {
    fetchProjects();
    document.documentElement.classList.add('dark');
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects');
      dispatch(setProjects(response.data)); // Redux'a projeleri yükle
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
        const response = await axios.put(`http://localhost:3001/api/projects/${editingProject}`, formDataToSend);
        dispatch({ type: 'UPDATE_PROJECT', payload: response.data });
        setEditingProject(null);
      } else {
        const response = await axios.post('http://localhost:3001/api/projects', formDataToSend);
        dispatch({ type: 'ADD_PROJECT', payload: response.data });
      }
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
      file: null, // dosya bilgisi güncellenmeyecek
      image: project.image,
      tags: project.tags.join(', '),
    });
    setEditingProject(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/projects/${id}`);
      dispatch({ type: 'DELETE_PROJECT', payload: id });
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
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Proje Paylaşım Alanı</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <input
          type="text"
          name="author"
          placeholder="Yazar"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Kategori"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Başlık"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="İçerik"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded h-32"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Proje Bağlantısı"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full mb-4"
        />
        <input
          type="text"
          name="image"
          placeholder="Görsel URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Etiketler (virgülle ayırın)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-40 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingProject ? 'Projeyi Güncelle' : 'Projeyi Ekle'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Projeler</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded-lg shadow bg-white-100 dark:bg-gray-900 dark:text-white">
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
                    className="flex-1 p-2 border rounded dark:text-black"
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

            {/* Proje Silme ve Düzenleme Butonları */}
            <div className="mt-2 flex">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mr-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
            
          </div>
        ))}
    </div>
    </div>
  );
};

export default ProjectCart;
