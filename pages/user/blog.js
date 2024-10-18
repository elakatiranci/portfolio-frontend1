import BlogUser from "@/components/BlogUser";
import NavbarUser from "@/components/NavbarUser";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <div>
      <NavbarUser />
      <div className="bg-gray-50 min-h-screen">
      <BlogUser />
    </div>
        <div className="mt-14"> 
        </div>
        <Footer />
    </div>
  );
}