import BlogCart from "@/components/BlogCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <div>
      <Navbar />
        <BlogCart/>
        <div className="mt-14"> 
        </div>
        <Footer />
    </div>
  );
}