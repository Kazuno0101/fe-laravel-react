// src/components/jenisBarang/AddJenisBarang.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJenisBarang = () => {
	const [jenisBarang, setJenisBarang] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/api/jenis-barang', { jenis_barang: jenisBarang });
			navigate('/jenis-barang');
		} catch (error) {
			console.error('Error adding jenis barang:', error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Tambah Jenis Barang</h2>
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
				<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
					Tambah
				</button>
			</form>
		</div>
	);
};

export default AddJenisBarang;
