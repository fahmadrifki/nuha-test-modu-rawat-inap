'use client';

import { useState, useEffect } from 'react';
import { PatientFormData, PatientFormErrors, Doctor, Room } from '@/types/patient';

interface PatientAdmissionFormProps {
  doctors: Doctor[];
  rooms: Room[];
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export default function PatientAdmissionForm({ doctors, rooms, onSubmit, onCancel }: PatientAdmissionFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    nama: '',
    nik: '',
    diagnosaMasuk: '',
    tanggalMasuk: '',
    dokterPenanggungJawab: '',
    ruangan: ''
  });

  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default tanggal masuk ke hari ini
  useEffect(() => {
    // Hanya set tanggal jika belum ada tanggal yang dipilih
    if (!formData.tanggalMasuk) {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, tanggalMasuk: today }));
    }
  }, [formData.tanggalMasuk]);

  const validateForm = (): boolean => {
    const newErrors: PatientFormErrors = {};

    // Validasi Nama
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    } else if (formData.nama.trim().length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter';
    }

    // Validasi NIK
    if (!formData.nik.trim()) {
      newErrors.nik = 'NIK wajib diisi';
    } else if (!/^\d{16}$/.test(formData.nik.trim())) {
      newErrors.nik = 'NIK harus 16 digit angka';
    }

    // Validasi Diagnosa
    if (!formData.diagnosaMasuk.trim()) {
      newErrors.diagnosaMasuk = 'Diagnosa masuk wajib diisi';
    } else if (formData.diagnosaMasuk.trim().length < 5) {
      newErrors.diagnosaMasuk = 'Diagnosa minimal 5 karakter';
    }

    // Validasi Tanggal Masuk
    if (!formData.tanggalMasuk) {
      newErrors.tanggalMasuk = 'Tanggal masuk wajib diisi';
    } else {
      const selectedDate = new Date(formData.tanggalMasuk);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.tanggalMasuk = 'Tanggal masuk tidak boleh di masa lalu';
      }
    }

    // Validasi Dokter
    if (!formData.dokterPenanggungJawab) {
      newErrors.dokterPenanggungJawab = 'Dokter penanggung jawab wajib dipilih';
    }

    // Validasi Ruangan
    if (!formData.ruangan) {
      newErrors.ruangan = 'Ruangan wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof PatientFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableRooms = rooms.filter(room => room.tersedia);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card shadow-lg">
        <div className="card-header">
          <h2 className="card-title">Formulir Pasien Masuk Rawat Inap</h2>
          <p className="card-subtitle">Silakan isi data lengkap pasien yang akan masuk rawat inap</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Data Pasien */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <span className="p-3 bg-blue-100 rounded-lg text-blue-600">👤</span>
              Data Pasien
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className={`form-input rounded-xl border-2 py-3 px-4 transition-all duration-200 ${errors.nama ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Masukkan nama lengkap pasien"
                  disabled={isSubmitting}
                />
                {errors.nama && (
                  <p className="form-error">{errors.nama}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  NIK *
                </label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  maxLength={16}
                  className={`form-input rounded-xl border-2 py-3 px-4 transition-all duration-200 ${errors.nik ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="16 digit NIK"
                  disabled={isSubmitting}
                />
                {errors.nik && (
                  <p className="form-error">{errors.nik}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Diagnosa Masuk *
                </label>
                <textarea
                  name="diagnosaMasuk"
                  value={formData.diagnosaMasuk}
                  onChange={handleInputChange}
                  rows={3}
                  className={`form-input resize-none rounded-xl border-2 py-3 px-4 transition-all duration-200 ${errors.diagnosaMasuk ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Masukkan diagnosa masuk pasien"
                  disabled={isSubmitting}
                />
                {errors.diagnosaMasuk && (
                  <p className="form-error">{errors.diagnosaMasuk}</p>
                )}
              </div>
            </div>
          </div>

          {/* Data Rawat Inap */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <span className="p-3 bg-green-100 rounded-lg text-green-600">🏥</span>
              Data Rawat Inap
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Tanggal Masuk *
                </label>
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleInputChange}
                  className={`form-input rounded-xl border-2 py-3 px-4 transition-all duration-200 ${errors.tanggalMasuk ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.tanggalMasuk && (
                  <p className="form-error">{errors.tanggalMasuk}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Dokter Penanggung Jawab *
                </label>
                <div className="select-wrapper">
                  <select
                    name="dokterPenanggungJawab"
                    value={formData.dokterPenanggungJawab}
                    onChange={handleInputChange}
                    className={`form-input rounded-xl border-2 py-3 px-4 pr-10 transition-all duration-200 ${errors.dokterPenanggungJawab ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                    disabled={isSubmitting}
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
                  >
                    <option value="">Pilih dokter</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.nama}>
                        {doctor.nama} - {doctor.spesialisasi}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.dokterPenanggungJawab && (
                  <p className="form-error">{errors.dokterPenanggungJawab}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="form-label font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Ruangan *
                </label>
                <div className="select-wrapper">
                  <select
                    name="ruangan"
                    value={formData.ruangan}
                    onChange={handleInputChange}
                    className={`form-input rounded-xl border-2 py-3 px-4 pr-10 transition-all duration-200 ${errors.ruangan ? 'border-red-500 ring-red-500/30 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 bg-white'} ${isSubmitting ? 'opacity-50' : ''}`}
                    disabled={isSubmitting}
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
                  >
                    <option value="">Pilih ruangan</option>
                    {availableRooms.map(room => (
                      <option key={room.id} value={room.nomor}>
                        {room.nomor} - {room.kelas}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.ruangan && (
                  <p className="form-error">{errors.ruangan}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Tersedia {availableRooms.length} ruangan dari {rooms.length} total ruangan
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500/30 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md shadow-sm border border-gray-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Batal</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md border border-green-500/20 flex items-center justify-center space-x-3 font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Daftarkan Pasien</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
