import { Doctor, Room } from '@/types/patient';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    nama: 'dr. Sarah Wijaya',
    spesialisasi: 'Penyakit Dalam'
  },
  {
    id: '2',
    nama: 'dr. Budi Santoso',
    spesialisasi: 'Kardiologi'
  },
  {
    id: '3',
    nama: 'dr. Rina Kartika',
    spesialisasi: 'Bedah Umum'
  },
  {
    id: '4',
    nama: 'dr. Ahmad Hidayat',
    spesialisasi: 'Neurologi'
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    nomor: '301',
    kelas: 'Kelas 1',
    tersedia: true
  },
  {
    id: '2',
    nomor: '302',
    kelas: 'Kelas 1',
    tersedia: true
  },
  {
    id: '3',
    nomor: 'VIP-01',
    kelas: 'VIP',
    tersedia: true
  },
  {
    id: '4',
    nomor: 'VIP-02',
    kelas: 'VIP',
    tersedia: false
  },
  {
    id: '5',
    nomor: '201',
    kelas: 'Kelas 2',
    tersedia: true
  },
  {
    id: '6',
    nomor: '202',
    kelas: 'Kelas 2',
    tersedia: true
  }
];
