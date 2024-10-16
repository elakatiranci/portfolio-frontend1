import 'react-quill/dist/quill.snow.css'; // React Quill CSS
import Navbar from '../components/Navbar'; // Header bileşenini içe aktar
import Footer from '../components/Footer'; // Footer bileşenini içe aktar
import Cart from '../components/BlogCart'; // Cart bileşenini içe aktar
import Profile from '@/components/Profile';

export default function HomePage() {
  return (
      <div>
        <Navbar />
        <Profile />
        <div className="mt-14"> 
        </div>
        <Footer />
      </div>
    );
}