# Progres Belajar Next.js: Proyek Portofolio & Blog

Ini adalah daftar progres yang akan saya kerjakan berdasarkan kurikulum dari `materi.md`.

---

## Bab 1: Dasar & Pengaturan Awal

- [ ] Buat komponen baru bernama `Bio.tsx` di dalam folder `src/app/components`.
- [ ] Komponen `Bio` harus menerima satu `prop` bernama `description` (tipe `string`).
- [ ] Tampilkan `description` tersebut di dalam sebuah tag `<p>`.
- [ ] Impor dan gunakan komponen `Bio` di `HomePage` (`src/app/page.tsx`) di bawah paragraf yang sudah ada, berikan deskripsi singkat tentang diri Anda.

### Verifikasi AI:
- [x] Buat komponen baru bernama `Bio.tsx` di dalam folder `src/app/components`.
- [x] Komponen `Bio` harus menerima satu `prop` bernama `description` (tipe `string`).
- [x] Tampilkan `description` tersebut di dalam sebuah tag `<p>`.
- [x] Impor dan gunakan komponen `Bio` di `HomePage` (`src/app/page.tsx`) di bawah paragraf yang sudah ada, berikan deskripsi singkat tentang diri Anda.

---

## Bab 2: Halaman, Routing & Navigasi

- [ ] Buat halaman baru untuk "Blog" dengan membuat folder `blog` dan di dalamnya file `page.tsx` di dalam `src/app`.
- [ ] Isi halaman `blog/page.tsx` dengan judul `<h1>Selamat Datang di Blog Saya</h1>`.
- [ ] Perbarui array `navLinks` di dalam `Navbar.tsx` untuk menyertakan link ke halaman Blog (`{ name: 'Blog', href: '/blog' }`).
- [ ] Pastikan link Blog muncul di navigasi dan berfungsi dengan benar.

### Verifikasi AI:
- [x] Buat halaman baru untuk "Blog" dengan membuat folder `blog` dan di dalamnya file `page.tsx` di dalam `src/app`.
- [x] Isi halaman `blog/page.tsx` dengan judul `<h1>Selamat Datang di Blog Saya</h1>`.
- [x] Perbarui array `navLinks` di dalam `Navbar.tsx` untuk menyertakan link ke halaman Blog (`{ name: 'Blog', href: '/blog' }`).
- [x] Pastikan link Blog muncul di navigasi dan berfungsi dengan benar.

---

## Bab 3: Komponen & Sistem Layout

- [ ] Buat komponen baru `SkillCard.tsx` yang menerima `prop` `skillName` (string) dan `level` ('Beginner', 'Intermediate', 'Advanced').
- [ ] Buat halaman baru di `src/app/(main)/skills/page.tsx`.
- [ ] Di halaman Skills, buat array data *mock* untuk beberapa keahlian Anda.
- [ ] Gunakan `.map()` untuk merender beberapa komponen `SkillCard` di halaman tersebut.

### Verifikasi AI:
- [x] Buat komponen baru `SkillCard.tsx` yang menerima `prop` `skillName` (string) dan `level` ('Beginner', 'Intermediate', 'Advanced').
- [x] Buat halaman baru di `src/app/(main)/skills/page.tsx`.
- [x] Di halaman Skills, buat array data *mock* untuk beberapa keahlian Anda.
- [x] Gunakan `.map()` untuk merender beberapa komponen `SkillCard` di halaman tersebut.

---

## Bab 4: Pengambilan Data & Integrasi API

- [ ] Buat API route baru di `src/app/api/skills/route.ts`.
- [ ] API ini harus mengembalikan data *mock* untuk keahlian Anda (mirip dengan tugas Bab 3).
- [ ] Ubah halaman `skills/page.tsx` menjadi *async component*.
- [ ] Gantilah data *mock* lokal dengan data yang diambil dari API `/api/skills` menggunakan `fetch`.

### Verifikasi AI:
- [x] Buat API route baru di `src/app/api/skills/route.ts`.
- [x] API ini harus mengembalikan data *mock* untuk keahlian Anda (mirip dengan tugas Bab 3).
- [x] Ubah halaman `skills/page.tsx` menjadi *async component*.
- [x] Gantilah data *mock* lokal dengan data yang diambil dari API `/api/skills` menggunakan `fetch`.

---

## Bab 5: Manajemen State & Form Interaktif

- [ ] Tambahkan state baru untuk validasi error: `const [errors, setErrors] = useState<Partial<FormData>>({})`. `Partial<FormData>` berarti objek error bisa memiliki beberapa atau semua properti dari `FormData`.
- [ ] Di dalam `handleSubmit`, sebelum `alert`, tambahkan logika validasi: jika `formData.name` kosong, set error untuk nama. Lakukan hal yang sama untuk email dan pesan.
- [ ] Jika ada error, jangan jalankan `alert` dan `setFormData`.
- [ ] Tampilkan pesan error di bawah setiap input jika ada error yang sesuai (misalnya, `errors.name && <p className="text-red-500">{errors.name}</p>`).

### Verifikasi AI:
- [x] Tambahkan state baru untuk validasi error: `const [errors, setErrors] = useState<Partial<FormData>>({})`. `Partial<FormData>` berarti objek error bisa memiliki beberapa atau semua properti dari `FormData`.
- [x] Di dalam `handleSubmit`, sebelum `alert`, tambahkan logika validasi: jika `formData.name` kosong, set error untuk nama. Lakukan hal yang sama untuk email dan pesan.
- [x] Jika ada error, jangan jalankan `alert` dan `setFormData`.
- [x] Tampilkan pesan error di bawah setiap input jika ada error yang sesuai (misalnya, `errors.name && <p className="text-red-500">{errors.name}</p>`).

---

## Bab 6: Pola TypeScript Tingkat Lanjut

- [ ] Refaktor halaman `skills/page.tsx` yang Anda buat sebelumnya.
- [ ] Impor komponen generik `<List>` yang baru dibuat.
- [ ] Gunakan `<List>` untuk merender daftar `SkillCard`. Anda perlu memberikan data ke `prop` `items` dan logika render untuk `SkillCard` ke `prop` `renderItem`.
- [ ] Pastikan tipe data skill Anda memiliki properti `id` agar sesuai dengan *constraint* komponen `List`.

### Verifikasi AI:
- [x] Refaktor halaman `skills/page.tsx` yang Anda buat sebelumnya.
- [x] Impor komponen generik `<List>` yang baru dibuat.
- [x] Gunakan `<List>` untuk merender daftar `SkillCard`. Anda perlu memberikan data ke `prop` `items` dan logika render untuk `SkillCard` ke `prop` `renderItem`.
- [x] Pastikan tipe data skill Anda memiliki properti `id` agar sesuai dengan *constraint* komponen `List`.

---

## Bab 7: Autentikasi & Keamanan dengan Next-Auth v4 (Versi Stabil)

- [x] Downgrade `next-auth` ke v4 yang stabil.
- [x] Buat file konfigurasi terpusat di `src/lib/auth.ts`.
- [x] Buat API handler untuk Next-Auth di `src/app/api/auth/[...nextauth]/route.ts`.
- [x] Buat middleware manual di `src/middleware.ts` untuk melindungi rute.
- [x] Buat komponen `Providers.tsx` untuk `SessionProvider`.
- [x] Perbarui `layout.tsx` untuk menggunakan `Providers`.
- [x] Buat komponen `AuthButton.tsx` untuk login/logout.
- [x] Tambahkan `AuthButton` ke dalam `Navbar`.

### Verifikasi AI:
- [x] Downgrade `next-auth` ke v4 yang stabil.
- [x] Buat file konfigurasi terpusat di `src/lib/auth.ts`.
- [x] Buat API handler untuk Next-Auth di `src/app/api/auth/[...nextauth]/route.ts`.
- [x] Buat middleware manual di `src/middleware.ts` untuk melindungi rute.
- [x] Buat komponen `Providers.tsx` untuk `SessionProvider`.
- [x] Perbarui `layout.tsx` untuk menggunakan `Providers`.
- [x] Buat komponen `AuthButton.tsx` untuk login/logout.
- [x] Tambahkan `AuthButton` ke dalam `Navbar`.

---

## Bab 8: Menyimpan Form Kontak ke Database dengan Prisma & Server Actions

- [x] Atur database Supabase dan tambahkan `DATABASE_URL` ke `.env.local`.
- [x] Install dan setup Prisma.
- [x] Definisikan model `ContactSubmission` di `schema.prisma`.
- [x] Jalankan `prisma migrate` dan `prisma generate` untuk sinkronisasi database.
- [x] Buat Server Action untuk menyimpan data kontak.
- [x] Refaktor halaman kontak untuk menggunakan Server Action.
- [x] Install `zod` dan tambahkan validasi di sisi server.

### Verifikasi AI:
- [x] Atur database Supabase dan tambahkan `DATABASE_URL` ke `.env.local`.
- [x] Install dan setup Prisma.
- [x] Definisikan model `ContactSubmission` di `schema.prisma`.
- [x] Jalankan `prisma migrate` dan `prisma generate` untuk sinkronisasi database.
- [x] Buat Server Action untuk menyimpan data kontak.
- [x] Refaktor halaman kontak untuk menggunakan Server Action.
- [x] Install `zod` dan tambahkan validasi di sisi server.

---

## Bab 9: Performa & Optimisasi

- [ ] Tambahkan kolom `imageUrl` (string) ke model `Post` Anda di `schema.prisma` dan jalankan migrasi.
- [ ] Saat menampilkan daftar post di halaman blog, gunakan komponen `<Image>` dari `next/image` untuk menampilkan gambar setiap post. Gunakan placeholder jika URL gambar tidak ada.
- [ ] Gunakan `next/font` untuk menerapkan font yang berbeda untuk judul (`<h1>`, `<h2>`) dan teks paragraf biasa di seluruh aplikasi Anda.

### Verifikasi AI:
- [ ] Tambahkan kolom `imageUrl` (string) ke model `Post` Anda di `schema.prisma` dan jalankan migrasi.
- [ ] Saat menampilkan daftar post di halaman blog, gunakan komponen `<Image>` dari `next/image` untuk menampilkan gambar setiap post. Gunakan placeholder jika URL gambar tidak ada.
- [ ] Gunakan `next/font` untuk menerapkan font yang berbeda untuk judul (`<h1>`, `<h2>`) dan teks paragraf biasa di seluruh aplikasi Anda.

---

## Bab 10: Deployment & Produksi

- [ ] Buat akun di [Vercel](https://vercel.com) dan hubungkan dengan akun GitHub Anda.
- [ ] Buat repositori baru di GitHub dan unggah kode proyek Anda.
- [ ] Impor repositori tersebut ke Vercel untuk membuat proyek baru.
- [ ] Konfigurasikan semua *Environment Variables* yang ada di file `.env.local` Anda ke dalam pengaturan proyek di Vercel.
- [ ] Pastikan proses build berhasil dan aplikasi Anda dapat diakses melalui URL yang disediakan Vercel. Bagikan URL tersebut!

### Verifikasi AI:
- [ ] Buat akun di [Vercel](https://vercel.com) dan hubungkan dengan akun GitHub Anda.
- [ ] Buat repositori baru di GitHub dan unggah kode proyek Anda.
- [ ] Impor repositori tersebut ke Vercel untuk membuat proyek baru.
- [ ] Konfigurasikan semua *Environment Variables* yang ada di file `.env.local` Anda ke dalam pengaturan proyek di Vercel.
- [ ] Pastikan proses build berhasil dan aplikasi Anda dapat diakses melalui URL yang disediakan Vercel. Bagikan URL tersebut!