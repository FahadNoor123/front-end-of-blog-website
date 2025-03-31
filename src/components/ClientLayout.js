"use client";  // ✅ Now it runs on the client side
import '../app/globals.css'; // Global styles
import { usePathname } from 'next/navigation';
import Navbar from '../components/NormalUsers/Navbar/Navbar';
import Footer from '../components/NormalUsers/Footer/Footer';
import ContactUs from './NormalUsers/contact/ContactUs';
import Login from './NormalUsers/Login/Login';
import Navbarsecond from './NormalUsers/Navbar/Navbarsecond';
import CookiePolicy from './NormalUsers/CookiesPolicy/CookiesPolicy';

export default function ClientLayout({ children }) {
  const pathname = usePathname(); // ✅ Now it works!

  return (
    <>
      {/* <Navbar /> */}
      <Navbarsecond />
      <main className="pt-0">{children}</main>
      
      {/* ✅ Conditionally render ContactUs only on the contact page */}
      {/* {pathname === "/contact" && <ContactUs />}
      {pathname === "/login" && <Login/>} */}
      <CookiePolicy/>

      <Footer />
     
      
    </>
  );
}
