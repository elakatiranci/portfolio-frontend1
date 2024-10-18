import 'react-quill/dist/quill.snow.css'; // React Quill CSS
import Navbar from '@/components/Navbar'; // Header bileşenini içe aktar
import Footer from '@/components/Footer'; // Footer bileşenini içe aktar
import Dashboard from '@/components/Dashboard';

export default function HomePage() {
  return (
      <div>
        <Navbar />
        <Dashboard />
        <div className="mt-14"> 
        </div>
        <Footer />
      </div>
    );
}