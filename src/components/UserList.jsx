import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">All Users</h2>

        <div className="flex flex-wrap -m-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 md:w-1/3 lg:w-1/4 sm:w-1/2 w-full">
              <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">User</h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{user.name}</h1>
                  <p className="leading-relaxed mb-3"><strong>Username:</strong> {user.username}</p>
                  <p className="leading-relaxed mb-3"><strong>Email:</strong> {user.email}</p>
                  <p className="leading-relaxed mb-3"><strong>Phone:</strong> {user.phone}</p>
                  <p className="leading-relaxed mb-3"><strong>Website:</strong> {user.website}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;
