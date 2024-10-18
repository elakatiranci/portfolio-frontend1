import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profileData);
  const [formData, setFormData] = useState({ ...profileData });
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data); // Kullanıcıları güncelle
        } else {
          console.error('Kullanıcılar alınırken hata:', data);
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchUsers();
    document.documentElement.classList.add('dark');
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      dispatch({ type: 'SET_PROFILE_IMAGE', payload: imageURL });
    }
  };

  const registerUser = async () => {
    const response = await fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Kullanıcı başarıyla kaydedildi!');
      dispatch({ type: 'SET_PROFILE_DATA', payload: data }); // Redux'a kaydet
      setFormData(data);
    } else {
      alert(data.message || 'Kullanıcı kaydı sırasında bir hata oluştu.');
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3001/api/users/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Kullanıcı başarıyla güncellendi!');
      dispatch({ type: 'SET_PROFILE_DATA', payload: formData }); // Redux'a güncelle
      setFormData({ ...formData, password: '' }); // Şifreyi sıfırla
    } else {
      console.error('Güncelleme hatası:', data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserClick = (user) => {
    setFormData({
      id: user._id,
      username: user.username,
      email: user.email,
      password: '', // Şifreyi boş bırakıyoruz, güvenlik için
      profileImage: user.profileImage || '/default-profile.png',
    });
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/api/users/${formData.id}`, {
      method: 'DELETE',
    });

    const data = await response.json(); // Yanıtı JSON olarak al

    if (response.ok) {
      alert('Kullanıcı başarıyla silindi!');
      const response = await fetch('http://localhost:3001/api/users');
      setFormData({
        id: '',
        username: '',
        email: '',
        password: '',
        profileImage: '/default-profile.png',
      });
    } else {
      alert(data.error || 'Kullanıcı silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border max-w-lg mx-auto dark:bg-gray-900 dark:text-white">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Kullanıcı Profili</h3>
        
        {/* Profile Image Section */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-md font-medium text-black-500">User name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-md font-medium text-black-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-md font-medium text-black-500">Password</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div>

      <div className="px-4 py-3 text-right space-x-2">
      <button
          onClick={registerUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >Kaydet
        </button>
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >Güncelle
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >Sil
        </button>
      </div>

        {/* Kullanıcı Listesi */}
      <div className="mt-4">
        <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900 dark:text-white">Kullanıcılar</h3>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id} className="ml-4 mr-2 py-4 cursor-pointer hover:bg-gray-100" onClick={() => handleUserClick(user)}>
               User name: <strong>{user.username}</strong> - Mail: <strong>{user.email}</strong>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
