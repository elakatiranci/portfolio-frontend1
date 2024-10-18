import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function NavbarUser() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode durumu
  const [isMenuOpen, setMenuOpen] = useState(false); // Hamburger menü durumu
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Hamburger menüyü aç/kapa
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setMenuOpen(false); // Dışarıya tıklayınca menüyü kapat
    }
  };

  // Dark mode durumunu değiştiren fonksiyon
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev); // Dark mode durumu tersine çevir
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Dışarıya tıklama kontrolü
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDarkMode]);

  return (
    <nav className={`bg-white border-gray-200 dark:bg-gray-900 rounded-lg shadow px-6 m-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <a href="#" className="flex items-center space-x-2 rtl:space-x-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="pink" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cat">
            <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
            <path d="M8 14v.5" />
            <path d="M16 14v.5" />
            <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
          </svg>
          <span className="font-bold self-center text-3xl whitespace-nowrap dark:text-pink-200 text-pink-300">Proto</span>
        </a>
        <div className="flex items-center md:order-2 space-x-5 md:space-x-4 rtl:space-x-reverse">
          {/* Dark mode toggle icon */}
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-moon">
                <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.9 4.9 1.4 1.4" />
                <path d="m17.7 17.7 1.4 1.4" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.3 17.7-1.4 1.4" />
                <path d="m19.1 4.9-1.4 1.4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <button type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isDropdownOpen}>
            <span className="sr-only">Open user menu</span>
            <Image className="w-8 h-8 rounded-full" src="/user.png" alt="user photo" width={32} height={32} />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className="top-16 right-12 absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">User</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profil</a>
                </li>
                <li>
                  <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Çıkış yap</a>
                </li>
              </ul>
            </div>
          )}
          <button data-collapse-toggle="navbar-user" type="button" onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} md:flex md:w-auto md:order-1`} id="navbar-user">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <a href="/user" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">About Me</a>
            </li>
            <li>
              <a href="/user/blog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">Blog</a>
            </li>
            <li>
              <a href="/user/proje" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">Proje</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
