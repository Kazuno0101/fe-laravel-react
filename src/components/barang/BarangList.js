// src/components/barang/BarangList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BarangList = () => {
	const [barang, setBarang] = useState([]);

	useEffect(() => {
		fetchBarang();
	}, []);

	const fetchBarang = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/barang');
			setBarang(response.data);
		} catch (error) {
			console.error('Error fetching barang:', error);
		}
	};

	const deleteBarang = async (id) => {
		if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
			try {
				await axios.delete(`http://localhost:8000/api/barang/${id}`);
				fetchBarang();
			} catch (error) {
				console.error('Error deleting barang:', error);
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Daftar Barang</h2>
				<Link to="/barang/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Tambah Barang
				</Link>
			</div>
			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="py-2 px-4 border">ID</th>
						<th className="py-2 px-4 border">Nama Barang</th>
						<th className="py-2 px-4 border">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{barang.map((item) => (
						<tr key={item.id} className="text-center">
							<td className="py-2 px-4 border">{item.id}</td>
							<td className="py-2 px-4 border">{item.nama_barang}</td>
							<td className="py-2 px-4 border">
								<Link
									to={`/barang/edit/${item.id}`}
									className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
								>
									Edit
								</Link>
								<button
									onClick={() => deleteBarang(item.id)}
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

export default BarangList;
