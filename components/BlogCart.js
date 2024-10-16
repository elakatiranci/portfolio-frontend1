import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

export default function Cart() {
  const [text, setText] = useState(''); // Paylaşım metnini tutar
  const [title, setTitle] = useState(''); // Başlık
  const [category, setCategory] = useState(''); // Kategori
  const [tags, setTags] = useState(''); // Etiketler
  const [posts, setPosts] = useState([]); // Paylaşımları tutar
  const [showMenu, setShowMenu] = useState(null); // Üç nokta menüsü
  const [likes, setLikes] = useState({}); // Beğenileri tutar
  const [liked, setLiked] = useState({}); // Hangi paylaşımların beğenildiğini tutar
  const [comments, setComments] = useState({}); // Yorumları tutar
  const [showCommentBox, setShowCommentBox] = useState({}); // Yorum ekleme kutusu
  const [commentText, setCommentText] = useState(''); // Yorum metnini tutar
  const [editingPost, setEditingPost] = useState(null); // Düzenlenen gönderi
  const [image, setImage] = useState(null); // Seçilen resmi tutar
  const [showFullText, setShowFullText] = useState({});

  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
  

  const maxTextLength = 10;

  const handleShare = () => {
    if (text.trim() && title.trim() && category.trim()) {
      const now = new Date();
      const formattedDate = now.toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          content: text,
          title,
          category,
          tags: tags.split(',').map(tag => tag.trim()), // Etiketleri düzenle
          image,
          username: 'John Doe',
          date: formattedDate, // Tarih ve saat
        },
      ]);
  
      // Alanları sıfırla
      setText('');
      setTitle('');
      setCategory('');
      setTags('');
      setImage(null);
    }
  };
  

  const toggleMenu = (id) => {
    // Üç nokta menüsünü aç/kapat
    setShowMenu(showMenu === id ? null : id);
  };

  const toggleFullText = (id) => {
    setShowFullText((prev) => ({
      ...prev,
      [id]: !prev[id], // Gönderinin tamamını aç/kapat
    }));
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEditingPost({ ...postToEdit });
      setText(postToEdit.content); // Düzenleme kutusunu doldur
      setTitle(postToEdit.title); // Başlığı doldur
      setCategory(postToEdit.category); // Kategoriyi doldur
      setTags(postToEdit.tags.join(', ')); // Etiketleri doldur
      setImage(postToEdit.image);
    }
  };

  const handleUpdate = () => {
    // Düzenlenmiş gönderiyi güncelle
    setPosts(
      posts.map((post) =>
        post.id === editingPost.id
          ? { 
              ...post, 
              content: text, 
              title, 
              category, 
              tags: tags.split(',').map(tag => tag.trim()), 
              image // Resmi güncelle
            }
          : post
      )
    );
    setEditingPost(null); // Düzenlemeyi sıfırla
    setText(''); // Metni temizle
    setTitle(''); // Başlığı temizle
    setCategory(''); // Kategoriyi temizle
    setTags(''); // Etiketleri temizle
    setImage(null); // Resmi sıfırla
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id)); // Paylaşımı sil
    setLikes((prev) => {
      const updatedLikes = { ...prev };
      delete updatedLikes[id]; // Silinen gönderinin beğeni sayısını kaldır
      return updatedLikes;
    });
    setLiked((prev) => {
      const updatedLiked = { ...prev };
      delete updatedLiked[id]; // Silinen gönderinin beğenildiğini kaldır
      return updatedLiked;
    });
    setComments((prev) => {
      const updatedComments = { ...prev };
      delete updatedComments[id]; // Silinen gönderinin yorumlarını kaldır
      return updatedComments;
    });
    setShowCommentBox((prev) => {
      const updatedShowCommentBox = { ...prev };
      delete updatedShowCommentBox[id]; // Silinen gönderinin yorum kutusunu kaldır
      return updatedShowCommentBox;
    });
  };

  const toggleLike = (id) => {
    // Beğeni durumu
    if (liked[id]) {
      // Eğer daha önce beğenildiyse beğeniyi kaldır
      setLikes((prev) => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) - 1), // Beğeni sayısını azalt
      }));
      setLiked((prev) => ({
        ...prev,
        [id]: false, // Kullanıcı beğenmedi olarak işaretle
      }));
    } else {
      setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1, // Beğeni sayısını artır
      }));
      setLiked((prev) => ({
        ...prev,
        [id]: true, // Kullanıcı beğendi olarak işaretle
      }));
    }
  };

  const toggleCommentBox = (id) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [id]: !prev[id], // Yorum kutusunu aç/kapat
    }));
  };

  const handleAddComment = (id) => {
    if (commentText.trim()) {
      // Yorum ekleme
      setComments((prev) => ({
        ...prev,
        [id]: [
          ...(prev[id] || []),
          { text: commentText, username: 'Jane Doe', profilePicture: '/profile2.jpg' }, // Kullanıcı bilgileri
        ],
      }));
      setCommentText(''); // Yorum metnini temizle
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Görseli boyutlandır
      const resizedImageBlob = await resizeImage(file, 800, 800); // max genişlik ve yükseklik 800px olsun
      const resizedImageURL = URL.createObjectURL(resizedImageBlob);
      
      // Görseli state'e kaydet
      setImage(resizedImageURL);
    }
  };
  
  // Görseli yeniden boyutlandırma işlevi
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = function () {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // En boy oranını koruyarak boyutlandır
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          // Görseli Blob olarak döndür
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        };
      };
      reader.readAsDataURL(file);
    });
  };
  

  return (
    <div className="max-w-lg mx-auto mb-6 p-4 space-y-6">
      {/* Paylaşım girişi */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full" src="/profile1.jpg" alt="User" />
          <div className="ml-3">
            <h5 className="text-lg font-bold text-gray-900">John Doe</h5>
            <p className="text-xs text-gray-500">Date-Time</p>
          </div>
        </div>

        {/* Kategori, Başlık, Metin, Görsel ve Etiketler alanları */}
        <input
          type="text"
          className="w-full mt-4 p-2 text-md border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori"
        />
        <input
          type="text"
          className="w-full mt-4 p-2 text-md border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
        />
        <textarea
          className="w-full mt-4 p-2 text-md border rounded-md"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Metin"
        />

        
        
        {/* Görsel Seçim Alanı */}
        <div className="mt-4">
          <label className="block text-md font-medium text-gray-700">Görsel Ekleyin</label>
          <div
            onClick={() => document.getElementById('image-upload').click()}
            className="cursor-pointer border border-dashed border-gray-400 rounded-md p-2 flex items-center justify-center text-gray-500"
          >
            {image ? (
              <img src={image} alt="Selected" className="w-full h-auto rounded-md" />
            ) : (
              <p>Henüz bir resim yüklenmedi. Buraya tıklayın.</p>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          className="w-full mt-4 p-2 text-md border rounded-md"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Etiketler (virgülle ayırın)"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white rounded-md px-4 py-2"
            onClick={editingPost ? handleUpdate : handleShare}
          >
            {editingPost ? 'Güncelle' : 'Paylaş'}
          </button>
        </div>
      </div>

      {/* Paylaşımlar */}
      {posts.slice().reverse().map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full" src="/profile1.jpg" alt="User" />
              <div className="ml-3">
                <h5 className="text-lg font-bold text-gray-900">{post.username}</h5>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
            <button onClick={() => toggleMenu(post.id)} className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </div>

          <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
          <h5 className="text-sm font-medium text-gray-700">{post.category}</h5>
          {post.image && (
            <div className="mt-2 mb-2 border border-gray-300 rounded-md p-2">
              <img src={post.image} alt="Post" className="w-full h-auto rounded-md" />
            </div>
          )}

          {/* Gönderi metni */}
          <p className="mt-4 text-sm text-gray-800">
  {showFullText[post.id]
    ? post.content // Eğer metin tam gösteriliyorsa içeriği olduğu gibi göster
    : post.content.length > maxTextLength
    ? post.content.substring(0, maxTextLength) + '...'  // Eğer metin uzun ise, belirli bir sayıda karakter göster
    : post.content}
  {post.content.length > maxTextLength && (
    <button
      className="text-blue-500 hover:text-blue-700 ml-2"
      onClick={() => toggleFullText(post.id)}
    >
      {showFullText[post.id] ? 'Daha az' : 'Daha fazlası'}
    </button>
  )}
</p>




{post.tags.length > 0 && (
  <div className="mt-2 text-sm text-gray-600">
    <strong>Etiketler:</strong> {post.tags.map(tag => `#${tag}`).join(', ')}
  </div>
)}



          <div className="flex items-center mt-3 space-x-4">
            <button onClick={() => toggleLike(post.id)}>
              {liked[post.id] ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
               ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              )}
              <span>{likes[post.id] || 0}</span>
            </button>
            <button onClick={() => toggleCommentBox(post.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
              <span>{(comments[post.id] || []).length}</span>
            </button>
          </div>

          {showCommentBox[post.id] && (
            <div className="flex justify-start mt-4 space-x-4">
              <input
                type="text"
                className="w-80 p-1 border rounded-md"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Yorum ekle..."
              />
              <button
                className="bg-blue-600 text-white mt-2 rounded-md px-4 py-2"
                onClick={() => handleAddComment(post.id)}
              >
                Yorum Yap
              </button>
            </div>
          )}

          {comments[post.id] && comments[post.id].length > 0 && (
            <div className="mt-4 border-t pt-2">
              {comments[post.id].map((comment, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <img className="w-8 h-8 rounded-full" src={comment.profilePicture} alt="User" />
                  <div>
                    <p className="font-semibold">{comment.username}</p>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showMenu === post.id && (
            <div className="absolute mx-80 -my-96 w-24 bg-white rounded-md shadow-lg dark:bg-gray-700">
            <button onClick={() => handleEdit(post.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Edit</button>
            <button onClick={() => handleDelete(post.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}