// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import BarangList from './components/barang/BarangList';
import AddBarang from './components/barang/AddBarang';
import EditBarang from './components/barang/EditBarang';

import JenisBarangList from './components/jenisBarang/JenisBarangList';
import AddJenisBarang from './components/jenisBarang/AddJenisBarang';
import EditJenisBarang from './components/jenisBarang/EditJenisBarang';

import TransaksiList from './components/transaksi/TransaksiList';
import AddTransaksi from './components/transaksi/AddTransaksi';
import EditTransaksi from './components/transaksi/EditTransaksi';

import CompareJenisBarang from './components/compare/CompareJenisBarang';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="bg-gray-800 p-4">
					<div className="container mx-auto flex space-x-4">
						<Link to="/barang" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
							Barang
						</Link>
						<Link to="/jenis-barang" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
							Jenis Barang
						</Link>
						<Link to="/transaksi" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
							Transaksi
						</Link>
					</div>
				</nav>
				<Routes>
					<Route path="/barang" element={<BarangList />} />
					<Route path="/barang/add" element={<AddBarang />} />
					<Route path="/barang/edit/:id" element={<EditBarang />} />

					<Route path="/jenis-barang" element={<JenisBarangList />} />
					<Route path="/jenis-barang/add" element={<AddJenisBarang />} />
					<Route path="/jenis-barang/edit/:id" element={<EditJenisBarang />} />

					<Route path="/transaksi" element={<TransaksiList />} />
					<Route path="/transaksi/add" element={<AddTransaksi />} />
					<Route path="/transaksi/edit/:id" element={<EditTransaksi />} />
					<Route path="/compare" element={<CompareJenisBarang />} />

					{/* Redirect atau halaman default */}
					<Route path="*" element={<BarangList />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
