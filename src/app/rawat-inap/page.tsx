'use client';

import { useState, useEffect } from 'react';
import { Patient, PatientFormData } from '@/types/patient';
import { mockDoctors, mockRooms } from '@/utils/mockData';
import PatientAdmissionForm from '@/components/rawat-inap/PatientAdmissionForm';
import PatientListTable from '@/components/rawat-inap/PatientListTable';
import PatientTableSkeleton from '@/components/rawat-inap/PatientTableSkeleton';

export default function RawatInapPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [setEditingPatient] = useState<Patient | null>(null);

  // Simulate loading dengan delay 500ms
  useEffect(() => {
    // Hanya jalankan timer jika masih loading
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleAddPatient = (formData: PatientFormData) => {
    const newPatient: Patient = {
      id: `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      status: 'aktif',
      createdAt: new Date().toISOString()
    };

    setPatients(prev => [newPatient, ...prev]);
    setShowForm(false);
    setEditingPatient(null);
    
    // Show success message
    alert('Pasien berhasil didaftarkan!');
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleViewPatient = (patient: Patient) => {
    // In a real app, this would navigate to a detailed view
    alert(`Detail Pasien:\nNama: ${patient.nama}\nNIK: ${patient.nik}\nDiagnosa: ${patient.diagnosaMasuk}\nRuangan: ${patient.ruangan}\nDokter: ${patient.dokterPenanggungJawab}\nTanggal Masuk: ${patient.tanggalMasuk}`);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 animate-pulse"></div>
          </div>
          <PatientTableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modul Rawat Inap</h1>
              <p className="text-gray-600 mt-2">Kelola data pasien rawat inap dan monitoring ruangan</p>
            </div>
            <div suppressHydrationWarning>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3 shadow-md border border-blue-500/20"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-semibold">Tambah Pasien Baru</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div suppressHydrationWarning>
          {showForm ? (
            <div className="mb-8">
              <PatientAdmissionForm
                doctors={mockDoctors}
                rooms={mockRooms}
                onSubmit={handleAddPatient}
                onCancel={handleCancelForm}
              />
            </div>
          ) : (
            <PatientListTable
              patients={patients}
              onEdit={handleEditPatient}
              onView={handleViewPatient}
            />
          )}
        </div>

        {/* Quick Stats */}
        {!showForm && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6" suppressHydrationWarning>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pasien</p>
                  <p className="text-2xl font-bold text-gray-900" suppressHydrationWarning>{patients.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">🏥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pasien Aktif</p>
                  <p className="text-2xl font-bold text-gray-900" suppressHydrationWarning>
                    {patients.filter(p => p.status === 'aktif').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🚪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ruangan Tersedia</p>
                  <p className="text-2xl font-bold text-gray-900" suppressHydrationWarning>
                    {mockRooms.filter(r => r.tersedia).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showForm && patients.length === 0 && (
          <div className="mt-8 text-center py-12" suppressHydrationWarning>
            <div className="text-gray-400 text-6xl mb-4">🏥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pasien rawat inap</h3>
            <p className="text-gray-500 mb-6">Mulai dengan mendaftarkan pasien pertama</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md border border-blue-500/20 flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-semibold">Daftarkan Pasien Pertama</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
