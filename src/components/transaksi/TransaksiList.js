// src/components/transaksi/TransaksiList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransaksiList = () => {
	const [transaksi, setTransaksi] = useState([]);
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState('tanggal_transaksi');
	const [sortOrder, setSortOrder] = useState('desc');

	useEffect(() => {
		fetchTransaksi();
	}, [search, sortBy, sortOrder]);

	const fetchTransaksi = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/transaksi', {
				params: {
					search: search,
					sort_by: sortBy,
					sort_order: sortOrder,
				},
			});
			setTransaksi(response.data);
		} catch (error) {
			console.error('Error fetching transaksi:', error);
		}
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleSort = (column) => {
		const order = sortOrder === 'asc' ? 'desc' : 'asc';
		setSortBy(column);
		setSortOrder(order);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Daftar Transaksi</h2>
				<Link to="/transaksi/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Tambah Transaksi
				</Link>
			</div>
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Cari barang"
			/>
			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('nama_barang')}>
							Nama Barang
							{sortBy === 'nama_barang' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
						</th>
						<th className="py-2 px-4 border">Stok</th>
						<th className="py-2 px-4 border">Jumlah Terjual</th>
						<th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('tanggal_transaksi')}>
							Tanggal Transaksi
							{sortBy === 'tanggal_transaksi' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
						</th>
						<th className="py-2 px-4 border">Jenis Barang</th>
					</tr>
				</thead>
				<tbody>
					{transaksi.map((item) => (
						<tr key={item.id} className="text-center">
							<td className="py-2 px-4 border">{item.barang.nama_barang}</td>
							<td className="py-2 px-4 border">{item.stok}</td>
							<td className="py-2 px-4 border">{item.jumlah_terjual}</td>
							<td className="py-2 px-4 border">{item.tanggal_transaksi}</td>
							<td className="py-2 px-4 border">{item.jenis_barang.jenis_barang}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TransaksiList;
