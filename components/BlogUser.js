import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogUser = () => {
  const [formData, setFormData] = useState({
    author: '',
    category: '',
    title: '',
    content: '',
    image: '',
    tags: '',
  });
  const [blogs, setBlogs] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState({}); // Yorum alanının görünürlüğünü kontrol etmek için

  useEffect(() => {
    fetchBlogs();
    document.documentElement.classList.add('dark');
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Blogları yüklerken hata:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await axios.put(`http://localhost:3001/api/blogs/${editingBlog}`, formData);
        setEditingBlog(null);
      } else {
        await axios.post('http://localhost:3001/api/blogs', formData);
      }
      fetchBlogs();
      setFormData({ author: '', category: '', title: '', content: '', image: '', tags: '' });
    } catch (error) {
      console.error('Blog eklerken veya güncellerken hata:', error.response.data);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      author: blog.author,
      category: blog.category,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      tags: blog.tags.join(', '), // Etiketleri virgülle ayırarak birleştir
    });
    setEditingBlog(blog._id); // Düzenleme moduna geç
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error('Blog silerken hata:', error);
    }
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async (blogId, e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/blogs/${blogId}/comments`, { content: commentContent });
      setCommentContent('');
      fetchBlogs();
    } catch (error) {
      console.error('Yorum eklerken hata:', error.response.data);
    }
  };

  const toggleCommentInput = (blogId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [blogId]: !prev[blogId], // Yorum alanını aç/kapat
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Bloglar</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-lg shadow bg-white-100 dark:bg-gray-900 text-black dark:text-white">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
            <p className="text-sm text-gray-500">Yazar: {blog.author}</p>
            <p className="text-sm text-gray-500">Kategori: {blog.category}</p>
            <p className="text-sm text-gray-500">Etiketler: {blog.tags.join(', ')}</p>
            {blog.image && <img src={blog.image} alt={blog.title} className="mt-2 w-full h-60" />}

            {/* Beğeni ve Yorum Butonları */}
            <div className="mt-2 flex items-center">
              <button
                onClick={async () => {
                  try {
                    await axios.put(`http://localhost:3001/api/blogs/${blog._id}/like`);
                    fetchBlogs(); // Beğeni eklendikten sonra blog listesini yenile
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
              <span className="ml-2 text-sm text-gray-500">{blog.likes} Beğeni</span>

              <button
                onClick={() => toggleCommentInput(blog._id)}
                className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600 ml-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Yorum
              </button>
              <span className="ml-2 text-sm text-gray-500">{blog.comments.length} Yorum</span>
            </div>

            {/* Yorumları Göster */}
            {showCommentInput[blog._id] && (
              <div className="mt-4">
                <form onSubmit={(e) => handleCommentSubmit(blog._id, e)} className="flex items-center">
                  <input
                    type="text"
                    value={commentContent}
                    onChange={handleCommentChange}
                    placeholder="Yorumunuzu yazın..."
                    className="flex-1 p-2 border rounded dark:text-black"
                    required
                  />
                  <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Paylaş</button>
                </form>
              </div>
            )}

            {/* Yorumları Listele */}
            <div className="mt-4">
              {blog.comments.map((comment) => (
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

export default BlogUser;
