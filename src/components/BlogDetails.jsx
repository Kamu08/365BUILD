import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (blog) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${blog.userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [blog]);

  if (!blog) return  <div className="flex justify-center items-center h-screen">
  <p className="text-center text-2xl">Loading...</p>
</div>;

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      <p className="mb-4">{blog.body}</p>
      {user && (
        <div className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-2xl font-bold mb-2">Author Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold mb-2">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2 p-4 border border-gray-200 rounded">
            <p><strong>{comment.name}</strong> ({comment.email})</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
