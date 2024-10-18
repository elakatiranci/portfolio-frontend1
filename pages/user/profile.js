import ProfileUser from "@/components/ProfileUser";
import NavbarUser from "@/components/NavbarUser";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
      <div>
        <NavbarUser />
        <ProfileUser />
        <div className="mt-96"> 
        </div>
        <Footer />
      </div>
    );
}