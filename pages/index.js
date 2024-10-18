import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="text-center rounded-lg">
      <Navbar />
      <img
        src="anasayfa.jpeg" // Fotoğrafın yolu burada olacak
        alt="An illustration of a programmer" // Alternatif metin
        className="mx-auto mb-4 w-3/4 h-auto rounded-lg" // Genişlik ve yükseklik ayarları
      />
      <h1 className="text-5xl font-bold text-black">Portfolioma Hoşgeldiniz!</h1>
      <p className="text-xl text-black mt-4 mb-10">Lütfen blog ve projelerimi inceleyiniz!</p>
      <Footer />
    </div>
  );
}