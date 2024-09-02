// src/components/barang/EditBarang.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBarang = () => {
	const { id } = useParams();
	const [namaBarang, setNamaBarang] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetchBarang();
	}, []);

	const fetchBarang = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/api/barang/${id}`);
			setNamaBarang(response.data.nama_barang);
		} catch (error) {
			console.error('Error fetching barang:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:8000/api/barang/${id}`, { nama_barang: namaBarang });
			navigate('/barang');
		} catch (error) {
			console.error('Error updating barang:', error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Edit Barang</h2>
			<form onSubmit={handleSubmit} className="max-w-md">
				<div className="mb-4">
					<label className="block text-gray-700">Nama Barang</label>
					<input
						type="text"
						value={namaBarang}
						onChange={(e) => setNamaBarang(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						placeholder="Masukkan nama barang"
						required
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Update
				</button>
			</form>
		</div>
	);
};

export default EditBarang;
