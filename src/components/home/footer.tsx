import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">StayFit</h3>
            <p className="text-gray-400">
              Integer maximus accumsan nunc, sit amet tempor lectus facilisis eu. Cras vel elit felis. Vestibulum convallis ipsum id
              aliquam varius.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-green-500 hover:text-green-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-green-500 hover:text-green-400">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-green-500 hover:text-green-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-green-500 hover:text-green-400">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xl font-bold text-green-500 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Clients
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-green-500 mb-4">Contact Info</h3>
            <p className="text-gray-400">
              <i className="fas fa-map-marker-alt text-green-500"></i> Goldschmidtstraße 13, 04103 Leipzig
            </p>
            <p className="mt-2 text-gray-400">
              <i className="fas fa-phone text-green-500"></i> +49078-039-23-11
            </p>
            <p className="text-gray-400">
              <i className="fas fa-phone text-green-500"></i> +49078-028-55-60
            </p>
          </div>

          {/* Instagram Posts */}
          <div>
            <h3 className="text-xl font-bold text-green-500 mb-4">Instagram Posts</h3>
            <p className="text-gray-400">...</p>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            Like-themes © All Rights Reserved - 2019 -{" "}
            <a href="#" className="text-green-500 hover:text-green-400">
              Purchase
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
