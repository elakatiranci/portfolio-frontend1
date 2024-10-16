import { useState } from 'react';

export default function Profile() {
  // State to manage profile information, including the profile image
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA 12345',
    profileImage: '/default-profile.png', // Default profile image
  });

  // State to manage form inputs, including the image
  const [formData, setFormData] = useState({ ...profileData });
  
  // Function to handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create URL for image preview
      setFormData({
        ...formData,
        profileImage: imageURL, // Set preview image URL
      });
    }
  };

  // Function to update profile data
  const handleUpdate = () => {
    setProfileData({ ...formData });
  };

  return (
    <profile>
      <div className="bg-white overflow-hidden shadow rounded-lg border max-w-lg mx-auto">
        <div className="px-4 py-5 sm:px-6 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">This is some information about the user.</p>

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
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
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
              <dt className="text-sm font-medium text-gray-500">Phone number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                  rows="2"
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-3 text-right">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </profile>
  );
}
