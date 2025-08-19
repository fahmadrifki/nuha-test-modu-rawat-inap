export interface Patient {
  id: string;
  nama: string;
  nik: string;
  diagnosaMasuk: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  ruangan: string;
  status: 'aktif' | 'pulang' | 'meninggal';
  createdAt: string;
}

export interface PatientFormData {
  nama: string;
  nik: string;
  diagnosaMasuk: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  ruangan: string;
}

export interface PatientFormErrors {
  nama?: string;
  nik?: string;
  diagnosaMasuk?: string;
  tanggalMasuk?: string;
  dokterPenanggungJawab?: string;
  ruangan?: string;
}

export interface Doctor {
  id: string;
  nama: string;
  spesialisasi: string;
}

export interface Room {
  id: string;
  nomor: string;
  kelas: string;
  tersedia: boolean;
}
