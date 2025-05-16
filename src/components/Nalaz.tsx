// src/pages/Nalaz.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import Sidebar from '../components/NavbarD';

const Nalaz: React.FC = () => {
  const { id } = useParams(); // ID korisnika
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    datum: '',
    laboratorij: '',
    leukociti: '',
    eritrociti: '',
    hemoglobin: '',
    secer: '',
    napomena: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'labReports'), {
        ...formData,
        korisnikId: id,
        timestamp: Timestamp.now(),
      });
      navigate('/patients');
    } catch (error) {
      console.error('Greška pri spremanju nalaza:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Sidebar />
      <div className="p-6 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Dodaj laboratorijski nalaz</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Datum</label>
              <input type="date" name="datum" value={formData.datum} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Laboratorij</label>
              <input type="text" name="laboratorij" value={formData.laboratorij} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Leukociti (×10⁹/L)</label>
              <input type="number" step="any" name="leukociti" value={formData.leukociti} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Eritrociti (×10¹²/L)</label>
              <input type="number" step="any" name="eritrociti" value={formData.eritrociti} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hemoglobin (g/L)</label>
              <input type="number" step="any" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Šećer (mmol/L)</label>
              <input type="number" step="any" name="secer" value={formData.secer} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Napomena</label>
            <textarea name="napomena" rows={4} value={formData.napomena} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sačuvaj nalaz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Nalaz;
