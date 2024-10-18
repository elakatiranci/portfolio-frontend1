import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const router = useRouter(); 

  const handleUpdate = () => {
    router.push('/profile'); // Kullanıcıyı /profile sayfasına yönlendir
  };


  // Kullanıcıları çekme
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3001/api/users');
    const data = await response.json();
    setUsers(data);
  };

  // Yorumları çekme
const fetchComments = async () => {
    try {
      // Blog yorumlarını çek
      const blogResponse = await fetch('http://localhost:3001/api/blogs'); 
      if (!blogResponse.ok) {
        throw new Error('Blog yorumları alınırken bir hata oluştu');
      }
      const blogComments = await blogResponse.json();
  
      // Proje yorumlarını çek
      const projectResponse = await fetch('http://localhost:3001/api/projects'); // Proje yorumları için API adresini güncelleyin
      if (!projectResponse.ok) {
        throw new Error('Proje yorumları alınırken bir hata oluştu');
      }
      const projectComments = await projectResponse.json();
  
      // Yorumları birleştir
      const combinedComments = [...blogComments, ...projectComments];
      setComments(combinedComments);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  // Beğenileri çekme
const fetchLikes = async () => {
    try {
      // Blog beğenilerini çek
      const blogResponse = await fetch('http://localhost:3001/api/blogs');
      if (!blogResponse.ok) {
        throw new Error('Blog beğenileri alınırken bir hata oluştu');
      }
      const blogData = await blogResponse.json();
  
      // Proje beğenilerini çek
      const projectResponse = await fetch('http://localhost:3001/api/projects');
      if (!projectResponse.ok) {
        throw new Error('Proje beğenileri alınırken bir hata oluştu');
      }
      const projectData = await projectResponse.json();
  
      // Beğenileri birleştir
      const combinedLikes = [...blogData.map(blog => ({ id: blog._id, likes: blog.likes, type: 'Blog' })), 
                               ...projectData.map(project => ({ id: project._id, likes: project.likes, type: 'Project' }))];
      
      setLikes(combinedLikes);
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  

  useEffect(() => {
    fetchUsers();
    fetchComments();
    fetchLikes();
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Kullanıcılar Kartı */}
<div className="bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-900 dark:text-white">
  <h2 className="text-2xl font-bold">Kullanıcılar</h2>
  <ul>
    {users.map(user => (
      <li key={user._id} className="py-3 border-b flex justify-between items-center">
        <span>
          <strong>{user._id}</strong> id'li kullanıcının kullanıcı adı: <strong>{user.username}</strong> maili: <strong>{user.email}</strong>
        </span>
        
      </li>
    ))}
  </ul>
  <div className='justify-center text-right space-x-2 mt-4'>
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Kullanıcı bilgilerini güncelle
        </button>
        </div>
</div>


      {/* Yorumlar Kartı */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold">Yorumlar</h2>
        <ul>
          {comments.map(comment => (
            <li key={comment._id} className="py-3 border-b flex justify-between items-center">
              <span><strong>{comment._id}</strong>, <strong>{comment.author}</strong> kullanıcısı tarafından <strong>{comment.content}</strong> bloguna yapıldı.</span>
              <div className='justify-end space-x-2'>
        <button
          //
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Onayla
        </button>
        <button
          // onClick={() => handleUpdate(user._id)} // Güncelleme fonksiyonunu tanımlayın
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Sil
        </button>
        </div>
            </li>
          ))}
        </ul>
      </div>

       {/* Beğeniler Kartı */}
       <div className="bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold">Beğeniler</h2>
        <ul>
          {likes.map(like => (
            <li key={like.id} className="py-3 border-b flex justify-between items-center">
              <span><strong>{like.id}</strong> id'li beğeni, <strong>{like.likes}</strong> adet beğenili <strong>{like.type}</strong> postuna yapıldı.</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
