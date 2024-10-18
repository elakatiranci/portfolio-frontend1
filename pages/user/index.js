// pages/user/index.js
import NavbarUser from '@/components/NavbarUser';
import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';

const UserHome = () => {
  return (
    <div>
      <NavbarUser />
      <AboutMe /> 
      <Footer />
    </div>
  );
};

export default UserHome;
