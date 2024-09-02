// src/components/transaksi/AddTransaksi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransaksi = () => {
	const [barangId, setBarangId] = useState('');
	const [stok, setStok] = useState('');
	const [jumlahTerjual, setJumlahTerjual] = useState('');
	const [tanggalTransaksi, setTanggalTransaksi] = useState('');
	const [jenisBarangId, setJenisBarangId] = useState('');
	const [barangList, setBarangList] = useState([]);
	const [jenisBarangList, setJenisBarangList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchBarang();
		fetchJenisBarang();
	}, []);

	const fetchBarang = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/barang');
			setBarangList(response.data);
		} catch (error) {
			console.error('Error fetching barang:', error);
		}
	};

	const fetchJenisBarang = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/jenis-barang');
			setJenisBarangList(response.data);
		} catch (error) {
			console.error('Error fetching jenis barang:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/api/transaksi', {
				barang_id: barangId,
				stok: stok,
				jumlah_terjual: jumlahTerjual,
				tanggal_transaksi: tanggalTransaksi,
				jenis_barang_id: jenisBarangId,
			});
			navigate('/transaksi');
		} catch (error) {
			console.error('Error adding transaksi:', error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Tambah Transaksi</h2>
			<form onSubmit={handleSubmit} className="max-w-md">
				<div className="mb-4">
					<label className="block text-gray-700">Barang</label>
					<select
						value={barangId}
						onChange={(e) => setBarangId(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						required
					>
						<option value="">Pilih Barang</option>
						{barangList.map((barang) => (
							<option key={barang.id} value={barang.id}>
								{barang.nama_barang}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Stok</label>
					<input
						type="number"
						value={stok}
						onChange={(e) => setStok(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						placeholder="Masukkan stok"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Jumlah Terjual</label>
					<input
						type="number"
						value={jumlahTerjual}
						onChange={(e) => setJumlahTerjual(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						placeholder="Masukkan jumlah terjual"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Tanggal Transaksi</label>
					<input
						type="date"
						value={tanggalTransaksi}
						onChange={(e) => setTanggalTransaksi(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Jenis Barang</label>
					<select
						value={jenisBarangId}
						onChange={(e) => setJenisBarangId(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						required
					>
						<option value="">Pilih Jenis Barang</option>
						{jenisBarangList.map((jenisBarang) => (
							<option key={jenisBarang.id} value={jenisBarang.id}>
								{jenisBarang.jenis_barang}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
					Tambah
				</button>
			</form>
		</div>
	);
};

export default AddTransaksi;
