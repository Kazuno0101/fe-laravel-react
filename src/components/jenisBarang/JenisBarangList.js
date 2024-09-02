// src/components/jenisBarang/JenisBarangList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JenisBarangList = () => {
	const [jenisBarang, setJenisBarang] = useState([]);

	useEffect(() => {
		fetchJenisBarang();
	}, []);

	const fetchJenisBarang = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/jenis-barang');
			setJenisBarang(response.data);
		} catch (error) {
			console.error('Error fetching jenis barang:', error);
		}
	};

	const deleteJenisBarang = async (id) => {
		if (window.confirm('Apakah Anda yakin ingin menghapus jenis barang ini?')) {
			try {
				await axios.delete(`http://localhost:8000/api/jenis-barang/${id}`);
				fetchJenisBarang();
			} catch (error) {
				console.error('Error deleting jenis barang:', error);
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Daftar Jenis Barang</h2>
					<div>
						<Link to="/jenis-barang/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Tambah Jenis Barang
						</Link>
						<Link to="/compare" className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
							Perbandingan Jenis Barang
						</Link>
					</div>
				</div>
			</div>
			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="py-2 px-4 border">ID</th>
						<th className="py-2 px-4 border">Jenis Barang</th>
						<th className="py-2 px-4 border">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{jenisBarang.map((item) => (
						<tr key={item.id} className="text-center">
							<td className="py-2 px-4 border">{item.id}</td>
							<td className="py-2 px-4 border">{item.jenis_barang}</td>
							<td className="py-2 px-4 border">
								<Link
									to={`/jenis-barang/edit/${item.id}`}
									className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
								>
									Edit
								</Link>
								<button
									onClick={() => deleteJenisBarang(item.id)}
									className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
								>
									Hapus
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default JenisBarangList;
