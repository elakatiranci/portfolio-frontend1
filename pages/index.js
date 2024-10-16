import 'react-quill/dist/quill.snow.css'; // React Quill CSS
import Navbar from '../components/Navbar'; // Header bileşenini içe aktar
import Footer from '../components/Footer'; // Footer bileşenini içe aktar
import Cart from '../components/BlogCart'; // Cart bileşenini içe aktar
import AboutMe from '@/components/AboutMe';

export default function HomePage() {
  return (
      <div>
        <Navbar />
        <AboutMe />
        <Footer />
      </div>
    );
}
