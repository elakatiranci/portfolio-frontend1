import BlogCart from "@/components/BlogCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
      <BlogCart />
    </div>
        <div className="mt-14"> 
        </div>
        <Footer />
    </div>
  );
}