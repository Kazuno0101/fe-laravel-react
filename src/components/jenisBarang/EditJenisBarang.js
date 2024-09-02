// src/components/jenisBarang/EditJenisBarang.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditJenisBarang = () => {
	const { id } = useParams();
	const [jenisBarang, setJenisBarang] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetchJenisBarang();
	}, []);

	const fetchJenisBarang = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/api/jenis-barang/${id}`);
			setJenisBarang(response.data.jenis_barang);
		} catch (error) {
			console.error('Error fetching jenis barang:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:8000/api/jenis-barang/${id}`, { jenis_barang: jenisBarang });
			navigate('/jenis-barang');
		} catch (error) {
			console.error('Error updating jenis barang:', error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Edit Jenis Barang</h2>
			<form onSubmit={handleSubmit} className="max-w-md">
				<div className="mb-4">
					<label className="block text-gray-700">Jenis Barang</label>
					<input
						type="text"
						value={jenisBarang}
						onChange={(e) => setJenisBarang(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						placeholder="Masukkan jenis barang"
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

export default EditJenisBarang;
