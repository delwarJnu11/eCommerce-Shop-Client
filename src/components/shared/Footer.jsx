import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <ul>
              <li>
                <Link
                  to={"/"}
                  className="hover:text-gray-400"
                  onClick={() => {
                    window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-gray-400"
                  onClick={() => {
                    window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
                  }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Tajmahar Road</p>
            <p>Mohammadpur, Dhaka-1207</p>
            <p>Email: shopee@gmail.com</p>
            <p>Phone: +880 1749497676</p>
          </div>

          {/* Column 3 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-600 hover:scale-110 transition-all"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-600 hover:scale-110 transition-all"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-600 hover:scale-110 transition-all"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-600 hover:scale-110 transition-all"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 4 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Payments</h3>
            <img src="https://i.ibb.co/vJ1RWwM/Payment-Brands.jpg" alt="SSL" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2024 Your E-commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
