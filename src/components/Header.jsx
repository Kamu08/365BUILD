import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="hover:underline">All Blogs</Link>

        <nav className="flex space-x-4">
          <Link to="/" className="text-3xl font-bold">365BUILD</Link>

        </nav>
        <Link to="/users" className="hover:underline">All Users</Link>

      </div>
    </header>
  );
};

export default Header;
