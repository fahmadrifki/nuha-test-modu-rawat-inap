import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sistem Informasi Rumah Sakit
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Selamat datang di platform manajemen rumah sakit yang modern dan terintegrasi
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Link href="/rawat-inap" className="group">
            <div className="module-card active hover:scale-105">
              <div className="module-icon">🏥</div>
              <h3 className="module-title group-hover:text-blue-600 transition-colors">
                Modul Rawat Inap
              </h3>
              <p className="module-description">
                Kelola data pasien rawat inap, pendaftaran pasien baru, dan monitoring ruangan
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Aktif
                </span>
              </div>
            </div>
          </Link>

          <div className="module-card disabled">
            <div className="module-icon">👨‍⚕️</div>
            <h3 className="module-title">Modul Dokter</h3>
            <p className="module-description">
              Kelola data dokter, jadwal praktik, dan spesialisasi
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="module-card disabled">
            <div className="module-icon">💊</div>
            <h3 className="module-title">Modul Farmasi</h3>
            <p className="module-description">
              Kelola stok obat, resep, dan distribusi obat
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="module-card disabled">
            <div className="module-icon">📊</div>
            <h3 className="module-title">Laporan & Analitik</h3>
            <p className="module-description">
              Generate laporan, dashboard, dan analisis data
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="module-card disabled">
            <div className="module-icon">⚙️</div>
            <h3 className="module-title">Pengaturan Sistem</h3>
            <p className="module-description">
              Konfigurasi sistem, user management, dan backup
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="module-card disabled">
            <div className="module-icon">🔐</div>
            <h3 className="module-title">Keamanan</h3>
            <p className="module-description">
              Manajemen hak akses, audit log, dan enkripsi data
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card mb-12">
          <div className="card-header">
            <h2 className="card-title">Statistik Sistem</h2>
            <p className="card-subtitle">Overview kinerja dan kapasitas sistem</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Modul Aktif</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Pasien Rawat Inap</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Dokter Tersedia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Ruangan Total</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 border-t border-gray-200 pt-8">
          <p className="text-sm">
            &copy; 2025 Sistem Informasi Rumah Sakit. Dibuat dengan Next.js, TypeScript, dan Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
}
