import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (isLogin) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Giriş başarılı!");
          router.push("/user"); // Giriş başarılıysa /user sayfasına yönlendirin
        } else {
          setError(data.message || "Giriş hatası!");
        }
      } catch (err) {
        setError("Sunucu hatası!");
      }
    } else {
      alert("Kayıt işlemi henüz desteklenmiyor.");
    }
  };

  return (
    <section className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so')" }}>
      <div className="absolute inset-0 bg-blue-950 opacity-50 backdrop-blur-lg"></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-10">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cat">
            <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/>
            <path d="M8 14v.5"/>
            <path d="M16 14v.5"/>
            <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
          </svg>
          Portfolio
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isLogin ? "Lütfen Giriş Yapınız" : "Lütfen Kayıt Olunuz"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center justify-between">
                {isLogin && (
                  <a href="#" className="text-sm font-medium text-gray-400 hover:underline dark:text-primary-500">Şifremi hatırlamıyorum.</a>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLogin ? "Giriş Yapın" : "Kayıt Olun"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isLogin ? (
                  <>
                    Henüz bir hesabınız yok mu?{" "}
                    <a
                      href="#"
                      className="font-medium text-white hover:underline dark:text-primary-500"
                      onClick={() => setIsLogin(false)}
                    >
                      Kayıt olun
                    </a>
                  </>
                ) : (
                  <>
                    Zaten bir hesabınız var mı?{" "}
                    <a
                      href="#"
                      className="font-medium text-white hover:underline dark:text-primary-500"
                      onClick={() => setIsLogin(true)}
                    >
                      Giriş yapın
                    </a>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
