// src/components/compare/CompareTransaksi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompareTransaksi = () => {
	const [transaksi, setTransaksi] = useState([]);
	const [sortBy, setSortBy] = useState('terbanyak');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	useEffect(() => {
		fetchTransaksi();
	}, [sortBy, startDate, endDate]);

	const fetchTransaksi = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/transaksi/compare', {
				params: {
					sort_by: sortBy,
					start_date: startDate,
					end_date: endDate,
				},
			});
			setTransaksi(response.data);
		} catch (error) {
			console.error('Error fetching transaksi:', error);
		}
	};

	const handleSortChange = (order) => {
		setSortBy(order);
	};

	const handleDateChange = (e) => {
		if (e.target.name === 'start_date') {
			setStartDate(e.target.value);
		} else {
			setEndDate(e.target.value);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Perbandingan Transaksi</h2>
				<div>
					<input type="date" name="start_date" value={startDate} onChange={handleDateChange} className="mr-2 px-2 py-1 border rounded" />
					<input type="date" name="end_date" value={endDate} onChange={handleDateChange} className="mr-2 px-2 py-1 border rounded" />
					<button
						onClick={() => handleSortChange('terbanyak')}
						className={`px-4 py-2 rounded ${sortBy === 'terbanyak' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
					>
						Terbanyak Terjual
					</button>
					<button
						onClick={() => handleSortChange('terendah')}
						className={`ml-2 px-4 py-2 rounded ${sortBy === 'terendah' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
					>
						Terendah Terjual
					</button>
				</div>
			</div>
			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="py-2 px-4 border">Nama Barang</th>
						<th className="py-2 px-4 border">Jenis Barang</th>
						<th className="py-2 px-4 border">Jumlah Terjual</th>
						<th className="py-2 px-4 border">Tanggal Transaksi</th>
					</tr>
				</thead>
				<tbody>
					{transaksi.map((item, index) => (
						<tr key={index} className="text-center">
							<td className="py-2 px-4 border">{item.nama_barang}</td>
							<td className="py-2 px-4 border">{item.jenis_barang}</td>
							<td className="py-2 px-4 border">{item.jumlah_terjual}</td>
							<td className="py-2 px-4 border">{item.tanggal_transaksi}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CompareTransaksi;
