import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
	const [blogs, setBlogs] = useState([]);
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const blogsPerPage = 15;

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/posts"
				);
				setBlogs(response.data);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/users"
				);
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchBlogs();
		fetchUsers();
	}, []);

	if (blogs.length === 0 || users.length === 0) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p className='text-center text-2xl'>Loading...</p>
			</div>
		);
	}

	const indexOfLastBlog = currentPage * blogsPerPage;
	const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
	const filteredBlogs = blogs.filter((blog) => {
		const user = users.find((user) => user.id === blog.userId);
		const authorName = user ? user.name.toLowerCase() : "";
		return (
			blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			authorName.includes(searchTerm.toLowerCase())
		);
	});
	const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredBlogs.length / blogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-3xl font-bold'>All Blogs</h2>
					<input
						type='text'
						placeholder='Search by title or author'
						className='px-4 py-2 border border-gray-300 rounded-lg'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='flex flex-wrap justify-center -m-4'>
					{currentBlogs.map((blog) => {
						const user = users.find((user) => user.id === blog.userId);
						return (
							<div
								key={blog.id}
								className='p-4 md:w-1/2 lg:w-1/3 sm:w-1/2 w-full'
							>
								<Link
									to={`/blog/${blog.id}`}
									className='block h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
								>
									<div className='p-6'>
										<div className='flex items-center justify-between'>
											<span className='text-gray-400  leading-none text-sm'>
												UserId: {blog.userId}
											</span>
											<span className='text-gray-400  leading-none text-sm'>
												Id: {blog.id}
											</span>
										</div>{" "}
										<h1 className='title-font text-lg font-medium text-gray-900 mb-3 capitalize'>
											{blog.title}
										</h1>
										<p className=' mb-3'>{blog.body}</p>
										{user && (
											<p className='mt-2 text-gray-950'>Author: {user.name}</p>
										)}
									</div>
								</Link>
							</div>
						);
					})}
				</div>
				<div className='flex justify-center mt-8'>
					<nav
						className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
						aria-label='Pagination'
					>
						{pageNumbers.map((number) => (
							<button
								key={number}
								onClick={() => paginate(number)}
								className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
									number === currentPage
										? "bg-blue-500 text-white"
										: "text-gray-700"
								} hover:bg-gray-200`}
							>
								{number}
							</button>
						))}
					</nav>
				</div>
			</div>
		</section>
	);
};

export default BlogList;
