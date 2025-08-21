# Kurikulum Lengkap Belajar Next.js: Proyek Portofolio & Blog (Versi Terbaru)

Panduan ini akan membawa Anda melalui 10 bab untuk membangun aplikasi Next.js dari nol, dimulai dengan portofolio statis, lalu mengubahnya menjadi blog dinamis dengan database, autentikasi, dan diakhiri dengan deployment, menggunakan dependensi dan pola terbaru.

---

## Daftar Isi

1.  [Bab 1: Dasar & Pengaturan Awal](#bab-1-dasar--pengaturan-awal)
2.  [Bab 2: Halaman, Routing & Navigasi](#bab-2-halaman-routing--navigasi)
3.  [Bab 3: Komponen & Sistem Layout](#bab-3-komponen--sistem-layout)
4.  [Bab 4: Pengambilan Data & Integrasi API](#bab-4-pengambilan-data--integrasi-api)
5.  [Bab 5: Manajemen State & Form Interaktif](#bab-5-manajemen-state--form-interaktif)
6.  [Bab 6: Pola TypeScript Tingkat Lanjut](#bab-6-pola-typescript-tingkat-lanjut)
7.  [Bab 7: Autentikasi & Keamanan dengan Auth.js v5](#bab-7-autentikasi--keamanan-dengan-authjs-v5)
8.  [Bab 8: Integrasi Database dengan Prisma + Supabase](#bab-8-integrasi-database-dengan-prisma--supabase)
9.  [Bab 9: Performa & Optimisasi](#bab-9-performa--optimisasi)
10. [Bab 10: Deployment & Produksi](#bab-10-deployment--produksi)

---

## Bab 1: Dasar & Pengaturan Awal

* **Tujuan:** Membuat halaman arahan pribadi untuk memperkenalkan struktur dasar proyek Next.js.
* **Proyek:** Halaman "Selamat Datang" sederhana.

### Keterampilan Utama:

* **Setup Proyek:** `npx create-next-app@latest --ts`
* **Struktur App Router:** Memahami `src/app`, `layout.tsx`, dan `page.tsx`.
* **Komponen React:** Membuat komponen fungsional panah (`Arrow Function Components`).
* **Props dengan TypeScript:** Mendefinisikan properti komponen menggunakan `interface` atau `type`.

### Contoh Kode & Penjelasan:

1.  **`src/app/components/Greeting.tsx`**

    ```typescript
    // Definisikan tipe untuk props
    type GreetingProps = {
      name: string;
    };

    // Komponen fungsional panah
    const Greeting = ({ name }: GreetingProps) => {
      return (
        <h1 className="text-4xl font-bold">
          Selamat Datang, {name}!
        </h1>
      );
    };

    export default Greeting;
    ```
    **Fungsi Kode:**
    * `type GreetingProps = { ... }`: Mendefinisikan "kontrak" atau "bentuk" dari data (`props`) yang diharapkan oleh komponen `Greeting`. TypeScript akan memberikan error jika kita mencoba menggunakan komponen ini tanpa memberikan `props` `name` yang bertipe `string`.
    * `const Greeting = ({ name }: GreetingProps) => { ... }`: Ini adalah **React Component**. Ia menerima `props` dan mengembalikan elemen JSX (HTML-like syntax) untuk ditampilkan di layar.
    * `export default Greeting`: Membuat komponen `Greeting` dapat diimpor dan digunakan di file lain.

2.  **`src/app/page.tsx` (Halaman Utama)**

    ```typescript
    import Greeting from './components/Greeting';

    const HomePage = () => {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <Greeting name="Pengunjung" />
          <p className="mt-4 text-lg">Ini adalah portofolio saya yang dibuat dengan Next.js.</p>
        </main>
      );
    };

    export default HomePage;
    ```
    **Fungsi Kode:**
    * `import Greeting from './components/Greeting'`: Mengimpor komponen `Greeting` agar bisa digunakan di halaman ini.
    * `const HomePage = () => { ... }`: Komponen Halaman (Page Component). Di Next.js App Router, file `page.tsx` secara otomatis menjadi halaman yang dapat diakses melalui URL.
    * `<Greeting name="Pengunjung" />`: Cara menggunakan komponen `Greeting` dengan memberikan `prop` `name` sesuai kontrak `GreetingProps`.

### Tugas:
1.  Buat komponen baru bernama `Bio.tsx` di dalam folder `src/app/components`.
2.  Komponen `Bio` harus menerima satu `prop` bernama `description` (tipe `string`).
3.  Tampilkan `description` tersebut di dalam sebuah tag `<p>`.
4.  Impor dan gunakan komponen `Bio` di `HomePage` (`src/app/page.tsx`) di bawah paragraf yang sudah ada, berikan deskripsi singkat tentang diri Anda.

---

## Bab 2: Halaman, Routing & Navigasi

* **Tujuan:** Menambahkan beberapa halaman (Tentang, Proyek) dan membuat navigasi utama.
* **Proyek:** Mengembangkan portofolio menjadi situs multi-halaman.

### Contoh Kode & Penjelasan:

1.  **`src/app/components/Navbar.tsx`**

    ```typescript
    'use client'; // Diperlukan untuk menggunakan hook

    import Link from 'next/link';
    import { usePathname } from 'next/navigation';

    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
    ];

    const Navbar = () => {
      const pathname = usePathname();

      return (
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link href={link.href} className={isActive ? 'text-blue-400' : 'text-white'}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      );
    };

    export default Navbar;
    ```
    **Fungsi Kode:**
    * `'use client'`: Menandai komponen ini sebagai **Client Component**. Ini diperlukan karena kita menggunakan *hook* (`usePathname`) yang membutuhkan interaksi di sisi browser.
    * `import Link from 'next/link'`: Komponen `Link` dari Next.js memungkinkan **navigasi sisi klien**, yang berarti halaman berpindah tanpa *full page refresh*, membuatnya terasa lebih cepat.
    * `const pathname = usePathname()`: *Hook* ini memberikan URL path saat ini (misalnya, `/about`).
    * `navLinks.map(...)`: Cara dinamis untuk membuat daftar link dari sebuah array data.
    * `className={isActive ? ... : ...}`: Memberikan kelas CSS yang berbeda jika link tersebut aktif, sehingga bisa diberi gaya visual.

2.  **`src/app/layout.tsx` (Diperbarui)**
    ```typescript
    import type { Metadata } from 'next';
    import Navbar from './components/Navbar';
    import './globals.css';

    export const metadata: Metadata = {
      title: 'Portofolio Saya',
      description: 'Dibuat dengan Next.js',
    };

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en">
          <body>
            <Navbar /> {/* Muncul di setiap halaman */}
            <main>{children}</main>
          </body>
        </html>
      );
    }
    ```
    **Fungsi Kode:**
    * `RootLayout`: Layout utama yang membungkus semua halaman. Dengan menempatkan `<Navbar />` di sini, kita memastikan navbar akan muncul di **setiap halaman** secara konsisten.
    * `{children}`: *Prop* khusus di React yang mewakili konten dari halaman spesifik yang sedang ditampilkan.

### Tugas:
1.  Buat halaman baru untuk "Blog" dengan membuat folder `blog` dan di dalamnya file `page.tsx` di dalam `src/app`.
2.  Isi halaman `blog/page.tsx` dengan judul `<h1>Selamat Datang di Blog Saya</h1>`.
3.  Perbarui array `navLinks` di dalam `Navbar.tsx` untuk menyertakan link ke halaman Blog (`{ name: 'Blog', href: '/blog' }`).
4.  Pastikan link Blog muncul di navigasi dan berfungsi dengan benar.

---

## Bab 3: Komponen & Sistem Layout

* **Tujuan:** Menampilkan daftar proyek menggunakan komponen `Card` yang dapat digunakan kembali dan mengorganisir rute.
* **Proyek:** Membuat halaman "Proyek" yang dinamis dari data *mock*.

### Contoh Kode & Penjelasan:

1.  **`src/app/components/Card.tsx`**
    ```typescript
    export interface CardProps {
      title: string;
      description: string;
      tech: string[];
    }

    const Card = ({ title, description, tech }: CardProps) => {
      return (
        <div className="border rounded-lg p-4 shadow-md h-full">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    };

    export default Card;
    ```
    **Fungsi Kode:**
    * `export interface CardProps`: Mendefinisikan bentuk data. Menggunakan `export` memungkinkan kita mengimpor `interface` ini di file lain untuk memastikan konsistensi tipe.
    * `const Card = (...)`: Komponen ini dirancang untuk menjadi generik dan dapat digunakan kembali di mana saja.

2.  **`src/app/(main)/projects/page.tsx` (Menggunakan Route Group)**
    ```typescript
    import Card, { CardProps } from '@/app/components/Card';

    const projectsData: CardProps[] = [
      {
        title: 'Website Portofolio',
        description: 'Portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      },
      {
        title: 'Aplikasi To-Do List',
        description: 'Aplikasi sederhana untuk manajemen tugas harian.',
        tech: ['React', 'Zustand'],
      },
    ];

    const ProjectsPage = () => {
      return (
        <section className="p-8 md:p-16">
          <h2 className="text-3xl font-bold mb-8">Proyek Saya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <Card key={project.title} {...project} />
            ))}
          </div>
        </section>
      );
    };

    export default ProjectsPage;
    ```
    **Fungsi Kode:**
    * **Route Group `(main)`**: Folder `(main)` adalah *Route Group*. Nama folder dalam kurung tidak akan menjadi bagian dari URL. Ini berguna untuk mengorganisir file atau menerapkan layout spesifik ke sekelompok halaman tanpa mengubah URL.
    * `const projectsData: CardProps[]`: Memberitahu TypeScript bahwa `projectsData` adalah sebuah array (`[]`) dari objek yang harus sesuai dengan bentuk `CardProps`.
    * `{...project}`: *Spread syntax* untuk meneruskan semua properti dari objek `project` sebagai `props` ke komponen `Card`.

### Tugas:
1.  Buat komponen baru `SkillCard.tsx` yang menerima `prop` `skillName` (string) dan `level` ('Beginner', 'Intermediate', 'Advanced').
2.  Buat halaman baru di `src/app/(main)/skills/page.tsx`.
3.  Di halaman Skills, buat array data *mock* untuk beberapa keahlian Anda.
4.  Gunakan `.map()` untuk merender beberapa komponen `SkillCard` di halaman tersebut.

---

## Bab 4: Pengambilan Data & Integrasi API

* **Tujuan:** Mengambil data proyek dari *API Route* internal, bukan dari data *mock*.
* **Proyek:** Membuat halaman "Proyek" menjadi dinamis sepenuhnya.

### Contoh Kode & Penjelasan:

1.  **`src/app/api/projects/route.ts`**
    ```typescript
    import { NextResponse } from 'next/server';
    import type { Project } from '@/types';

    const projects: Project[] = [
        { id: 1, title: 'Proyek dari API', description: 'Deskripsi dari API.', tech: ['Next.js', 'API Routes'] }
    ];

    export async function GET() {
      // Simulasi jeda jaringan
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(projects);
    }
    ```
    **Fungsi Kode:**
    * `export async function GET()`: Mengekspor fungsi dengan nama `GET`, `POST`, dll., dari file `route.ts` akan secara otomatis membuat **API Endpoint**.
    * `NextResponse.json(projects)`: Cara standar untuk mengirim respons JSON dari API Route di Next.js.

2.  **`src/app/(main)/projects/page.tsx` (Diperbarui)**
    ```typescript
    import Card from '@/app/components/Card';
    import type { Project } from '@/types'; // Asumsikan tipe Project punya id

    async function getProjects(): Promise<Project[]> {
      const res = await fetch(`${process.env.APP_URL}/api/projects`, {
        cache: 'no-store', // Selalu ambil data terbaru
      });
      if (!res.ok) throw new Error('Gagal mengambil data proyek');
      return res.json();
    }

    const ProjectsPage = async () => {
      const projects = await getProjects();

      return (
        <section className="p-8 md:p-16">
          <h2 className="text-3xl font-bold mb-8">Proyek Saya (Data dari API)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
              />
            ))}
          </div>
        </section>
      );
    };

    export default ProjectsPage;
    ```
    **Fungsi Kode:**
    * `const ProjectsPage = async () =>`: Menambahkan `async` mengubahnya menjadi **React Server Component (RSC)**, yang di-render di server.
    * `await getProjects()`: Karena ini RSC, kita bisa langsung menggunakan `await` untuk mengambil data sebelum halaman di-render.
    * `cache: 'no-store'`: Opsi ini memberitahu Next.js untuk tidak menyimpan hasil `fetch` ini dalam cache, sehingga data selalu segar. Opsi lain adalah `next: { revalidate: 3600 }` untuk *Incremental Static Regeneration* (ISR).
    * *Catatan: Buat file `.env.local` dan tambahkan `APP_URL=http://localhost:3000`.*

### Tugas:
1.  Buat API route baru di `src/app/api/skills/route.ts`.
2.  API ini harus mengembalikan data *mock* untuk keahlian Anda (mirip dengan tugas Bab 3).
3.  Ubah halaman `skills/page.tsx` menjadi *async component*.
4.  Gantilah data *mock* lokal dengan data yang diambil dari API `/api/skills` menggunakan `fetch`.

---
## Bab 5: Manajemen State & Form Interaktif

* **Tujuan:** Menambahkan halaman kontak dengan formulir interaktif.
* **Proyek:** Membuat formulir "Hubungi Saya".

### Contoh Kode & Penjelasan:

**`src/app/(main)/contact/page.tsx`**

```typescript
'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

type FormData = { name: string; email: string; message: string; };

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Pesan terkirim: ${JSON.stringify(formData)}`);
    // Di aplikasi nyata, Anda akan mengirim data ini ke API atau Server Action
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <section className="p-8 md:p-16">
      <h2 className="text-3xl font-bold mb-8">Hubungi Saya</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        {/* Input fields untuk nama, email, dan textarea */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Kirim Pesan
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
```
**Fungsi Kode:**
* `'use client'`: Diperlukan karena kita menggunakan *state* (`useState`) dan *event handler*, fungsionalitas interaktif yang berjalan di browser.
* `const [formData, setFormData] = useState<FormData>(...)`: *Hook* `useState` untuk mengelola state formulir.
* `handleChange`: Fungsi yang dipanggil setiap kali pengguna mengetik. Ini memperbarui state secara *immutable* dengan menyalin state lama (`...prevData`) dan menimpa properti yang berubah.
* `handleSubmit`: Fungsi yang dipanggil saat form di-submit. `e.preventDefault()` mencegah browser me-refresh halaman.

### Tugas:
1.  Tambahkan state baru untuk validasi error: `const [errors, setErrors] = useState<Partial<FormData>>({})`. `Partial<FormData>` berarti objek error bisa memiliki beberapa atau semua properti dari `FormData`.
2.  Di dalam `handleSubmit`, sebelum `alert`, tambahkan logika validasi: jika `formData.name` kosong, set error untuk nama. Lakukan hal yang sama untuk email dan pesan.
3.  Jika ada error, jangan jalankan `alert` dan `setFormData`.
4.  Tampilkan pesan error di bawah setiap input jika ada error yang sesuai (misalnya, `errors.name && <p className="text-red-500">{errors.name}</p>`).

---

## Bab 6: Pola TypeScript Tingkat Lanjut

* **Tujuan:** Merefaktor komponen daftar menjadi komponen generik yang dapat digunakan kembali.
* **Proyek:** Membuat komponen `<List>` generik.

### Contoh Kode & Penjelasan:

**`src/app/components/List.tsx`**

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

// Constraint generik T harus memiliki properti 'id'
const List = <T extends { id: number | string }>({ items, renderItem, className }: ListProps<T>) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default List;
```
**Fungsi Kode:**
* `interface ListProps<T>` dan `const List = <T ...>`: `T` adalah **tipe generik**, bertindak sebagai placeholder untuk tipe data apa pun. Komponen ini bisa bekerja dengan array `Project`, `User`, dll.
* `renderItem: (item: T) => React.ReactNode`: Ini adalah **render prop**. Komponen `List` mendelegasikan logika render setiap item kembali ke komponen induk melalui fungsi ini.
* `<T extends { id: number | string }>`: **Constraint generik** yang memastikan tipe `T` apa pun *harus* memiliki properti `id` agar bisa digunakan sebagai `key` dengan aman.

### Tugas:
1.  Refaktor halaman `skills/page.tsx` yang Anda buat sebelumnya.
2.  Impor komponen generik `<List>` yang baru dibuat.
3.  Gunakan `<List>` untuk merender daftar `SkillCard`. Anda perlu memberikan data ke `prop` `items` dan logika render untuk `SkillCard` ke `prop` `renderItem`.
4.  Pastikan tipe data skill Anda memiliki properti `id` agar sesuai dengan *constraint* komponen `List`.

---

## Bab 7: Autentikasi & Keamanan dengan Next-Auth v4 (Versi Stabil)

* **Tujuan:** Mengamankan aplikasi dengan fungsionalitas login/logout menggunakan **Next-Auth v4**, versi yang terbukti stabil dan andal, serta melindunginya menggunakan **Middleware**.
* **Proyek:** Membuat halaman "Dashboard" yang hanya bisa diakses oleh pengguna yang sudah login.

### Konsep Utama

*   **Next-Auth v4:** Versi library yang sudah matang untuk menangani autentikasi. Kita akan menggunakan pola yang paling umum dan stabil dari versi ini.
*   **Middleware:** Kode yang berjalan di server sebelum sebuah permintaan selesai diproses. Kita akan membuat middleware secara manual untuk memeriksa status login pengguna.
*   **`getToken`:** Fungsi dari `next-auth/jwt` untuk membaca dan memverifikasi token sesi pengguna di dalam middleware.

---

### Struktur Folder & File Baru

```text
next-project/
├── .env.local          <-- (Sama seperti sebelumnya)
└── src/
    ├── middleware.ts       <-- BARU: Logika proteksi rute manual
    ├── lib/
    │   └── auth.ts         <-- BARU: Konfigurasi terpusat untuk authOptions
    └── app/
        ├── api/
        │   └── auth/
        │       └── [...nextauth]/
        │           └── route.ts  <-- BARU: API handler untuk Next-Auth
        ├── components/
        │   ├── Providers.tsx   <-- BARU: Wrapper untuk SessionProvider
        │   ├── AuthButton.tsx  <-- BARU: Komponen tombol login/logout
        │   └── Navbar.tsx      <-- DIMODIFIKASI
        ├── dashboard/
        │   └── page.tsx        <-- BARU: Halaman yang dilindungi
        ├── layout.tsx          <-- DIMODIFIKASI
        └── ... (file lainnya)
```

---

### Langkah-langkah Implementasi

#### Langkah 1: Instalasi & Downgrade

Kita akan menghapus versi beta dan menginstal versi stabil terbaru dari `next-auth`.

```bash
npm uninstall next-auth
npm install next-auth
```

#### Langkah 2: Konfigurasi Environment Variables

Langkah ini sama persis seperti sebelumnya. Pastikan file `.env.local` Anda di root proyek berisi variabel-variabel berikut:

```
AUTH_SECRET="GantiDenganKunciRahasiaAnda"
AUTH_GITHUB_ID="GantiDenganGitHubClientIdAnda"
AUTH_GITHUB_SECRET="GantiDenganGitHubClientSecretAnda"
```

#### Langkah 3: File Konfigurasi Terpusat (`lib/auth.ts`)

Pada v4, praktik terbaiknya adalah membuat satu file untuk menampung semua konfigurasi `NextAuth`. Buat folder `lib` di dalam `src`, lalu buat file `auth.ts`.

**File: `src/lib/auth.ts`**
```typescript
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Konfigurasi provider, misalnya GitHub
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  // Secret ini digunakan untuk mengenkripsi JWT
  secret: process.env.AUTH_SECRET,
  // Opsi session, kita menggunakan JWT
  session: {
    strategy: "jwt",
  },
};
```

#### Langkah 4: API Route untuk Next-Auth

Sekarang, buat API handler yang akan menggunakan `authOptions` di atas.

**File: `src/app/api/auth/[...nextauth]/route.ts`**
```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Impor dari file konfigurasi

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

#### Langkah 5: Middleware Manual (`src/middleware.ts`)

Ini adalah bagian yang paling berbeda. Kita akan membuat middleware secara manual, seperti contoh yang Anda berikan.

**File: `src/middleware.ts`**
```typescript
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    // Tentukan halaman mana saja yang ingin Anda lindungi
    const protectedPaths = ['/dashboard'];

    // Cek jika path saat ini adalah salah satu dari path yang dilindungi
    const isProtectedRoute = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

    // Jika tidak ada token (belum login) DAN path dilindungi, alihkan ke halaman utama
    if (!token && isProtectedRoute) {
        const url = req.nextUrl.clone();
        url.pathname = '/'; // Alihkan ke halaman utama
        return NextResponse.redirect(url);
    }

    // Jika sudah login atau path tidak dilindungi, lanjutkan seperti biasa.
    return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan path mana saja yang akan dilewati middleware
export const config = {
    matcher: [
        '/dashboard/:path*', // Lindungi semua sub-path dari dashboard
    ],
};
```
**Catatan:** Perhatikan `matcher` di sini lebih sederhana. Kita hanya menargetkan rute yang ingin kita lindungi secara eksplisit.

#### Langkah 6: Integrasi Frontend

Untuk mengatasi error `React Context is unavailable in Server Components`, kita perlu membuat komponen client terpisah untuk `SessionProvider`.

**A. Buat Komponen `Providers.tsx`**

Buat komponen client-side baru yang tugasnya hanya untuk membungkus `SessionProvider`.

**File: `src/app/components/Providers.tsx`**
```typescript
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

**B. Perbarui `layout.tsx` untuk Menggunakan `Providers`**

Sekarang, impor dan gunakan komponen `Providers` tersebut di dalam `layout.tsx` untuk membungkus `children` Anda.

**File: `src/app/layout.tsx` (Yang Benar)**
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers"; // <-- Impor komponen baru

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bungkus children di dalam body, bukan seluruh html */}
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
```

**C. Buat Tombol Login/Logout (`AuthButton.tsx`)**
Komponen ini tidak berubah.

**File: `src/app/components/AuthButton.tsx`**
```typescript
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-md"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-white hidden md:block">{session.user?.name}</p>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn('github')} className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors">
      Sign In
    </button>
  );
};

export default AuthButton;
```

**D. Tambahkan Tombol ke Navbar (`Navbar.tsx`)**

Terakhir, kita perbarui `Navbar.tsx` untuk menampilkan tombol login dan juga link "Dashboard" secara kondisional hanya untuk pengguna yang sudah login.

**File: `src/app/components/Navbar.tsx` (Final)**
```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Impor useSession
import AuthButton from './AuthButton';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession(); // Dapatkan data sesi

  // Daftar link navigasi dasar
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skill' },
    { name: 'Contact', href: '/contact' },
  ];

  // Jika ada sesi (pengguna login), tambahkan link Dashboard ke daftar
  if (session) {
    navLinks.push({ name: 'Dashboard', href: '/dashboard' });
  }

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link href={link.href} className={`${isActive ? 'text-blue-400 font-bold' : 'text-white'} hover:text-blue-300 transition-colors`}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
```
**Pembaruan Logika:** Kode ini sekarang menggunakan hook `useSession` untuk memeriksa apakah pengguna sudah login. Jika ya, link ke "Dashboard" akan ditambahkan secara dinamis ke dalam daftar navigasi. Ini adalah UX yang lebih baik.

### Tugas:
1.  Jalankan perintah instalasi dan downgrade dari Langkah 1.
2.  Buat dan modifikasi file-file sesuai panduan v4 di atas.
3.  Buat halaman `dashboard` jika belum ada.
4.  Jalankan aplikasi dan tes alur login, akses halaman terproteksi, dan logout.

---

### Langkah Tambahan (Opsional): Autorisasi Pengguna

Bagaimana jika Anda hanya ingin email tertentu yang bisa mengakses `/dashboard`, meskipun mereka sudah login? Ini disebut **autorisasi**.

**1. Tambahkan Variabel Environment Baru**

Tambahkan daftar email yang Anda izinkan ke file `.env.local`. Pisahkan dengan koma.

**File: `.env.local`**
```
AUTH_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# Tambahkan variabel baru ini
AUTHORIZED_EMAILS="email.anda@gmail.com,user_lain@example.com"
```

**2. Perbarui Middleware dengan Logika Autorisasi**

Ganti kode di `src/middleware.ts` Anda untuk memeriksa apakah email pengguna yang login ada di dalam daftar yang diizinkan.

**File: `src/middleware.ts` (Dengan Autorisasi)**
```typescript
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const protectedPaths = ['/dashboard'];
    const isProtectedRoute = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

    // Jika pengguna mencoba mengakses halaman yang dilindungi...
    if (isProtectedRoute) {
        // 1. Jika mereka BELUM LOGIN (tidak ada token), alihkan.
        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

        // 2. Jika mereka SUDAH LOGIN, cek emailnya.
        const authorizedEmails = (process.env.AUTHORIZED_EMAILS || "").split(",");
        const isAuthorized = authorizedEmails.includes(token.email as string);

        // Jika email pengguna TIDAK terdaftar, alihkan juga.
        if (!isAuthorized) {
            const url = req.nextUrl.clone();
            url.pathname = '/'; // Alihkan ke halaman utama
            return NextResponse.redirect(url);
        }
    }

    // 3. Jika semua pemeriksaan lolos, izinkan akses.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};
```
Dengan ini, sekarang middleware Anda tidak hanya memeriksa *apakah* pengguna login, tetapi juga *siapa* pengguna yang login.

---

## Bab 8: Menyimpan Form Kontak ke Database dengan Prisma & Server Actions

*   **Tujuan:** Meng-upgrade Form Kontak dari Bab 5. Daripada hanya menampilkan `alert`, kita akan menyimpan setiap pesan yang masuk ke dalam database PostgreSQL menggunakan Prisma, dan memproses form tersebut dengan **Server Actions**.
*   **Proyek:** Membuat Form Kontak yang fungsional dan terhubung dengan database.

### Konsep Utama

*   **Prisma:** ORM (Object-Relational Mapper) modern untuk Node.js dan TypeScript. Prisma memudahkan kita berinteraksi dengan database menggunakan kode TypeScript, bukan SQL mentah.
*   **Server Actions:** Fitur dari Next.js yang memungkinkan kita menjalankan kode di sisi server secara aman, langsung sebagai respons dari interaksi pengguna (seperti submit form), tanpa perlu membuat API route manual.
*   **`useFormStatus`:** Hook dari React untuk mendapatkan status dari form submission terakhir (misalnya, "pending"), yang berguna untuk menampilkan UI loading pada tombol submit.

---

### Struktur Folder & File Baru

```text
next-project/
├── prisma/
│   └── schema.prisma   <-- DIMODIFIKASI: Menambahkan model baru
└── src/
    └── app/
        ├── actions/
        │   └── contact.ts  <-- BARU: Server Action untuk menyimpan data
        └── (main)/
            └── contact/
                └── page.tsx    <-- DIMODIFIKASI: Menggunakan Server Action
```

---

### Langkah-langkah Implementasi

#### Langkah 1: Pengaturan Database (Supabase)

Jika Anda belum melakukannya, buat proyek baru di [Supabase](https://supabase.com/) untuk mendapatkan database PostgreSQL gratis.

Setelah proyek dibuat, navigasi ke **Project Settings > Database > Connection string** dan salin URL yang formatnya `postgresql://...`.

Tambahkan URL ini ke file `.env.local` Anda.

**File: `.env.local`**
```
# ... variabel lainnya
DATABASE_URL="URL_KONEKSI_SUPABASE_ANDA"
```

#### Langkah 2: Instalasi & Setup Prisma

Install Prisma Client di proyek Anda.

```bash
npm install prisma
npx prisma init
```

Perintah `init` akan membuat folder `prisma` dengan file `schema.prisma`.

#### Langkah 3: Definisikan Skema Database

Buka file `prisma/schema.prisma` dan ganti isinya untuk mendefinisikan tabel `ContactSubmission`.

**File: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Model untuk menyimpan pesan dari form kontak
model ContactSubmission {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

#### Langkah 4: Sinkronkan Skema dengan Database

Jalankan perintah `migrate` dari Prisma. Ini akan membaca `schema.prisma` Anda dan membuat tabel `ContactSubmission` yang sesuai di database Supabase Anda.

```bash
npx prisma migrate dev --name init_contact_submission
```
Setelah ini, jalankan juga `prisma generate` untuk memperbarui Prisma Client Anda:
```bash
npx prisma generate
```

#### Langkah 5: Buat Server Action

Ini adalah inti dari logika kita. Buat folder `actions` di dalam `src/app`, lalu buat file `contact.ts`.

**File: `src/app/actions/contact.ts`**
```typescript
'use server';

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definisikan skema validasi menggunakan Zod
const contactSchema = z.object({
  name: z.string().min(3, { message: "Nama harus lebih dari 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  message: z.string().min(10, { message: "Pesan harus lebih dari 10 karakter." }),
});

// Definisikan satu bentuk state yang konsisten
export type ContactFormState = {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

// Server Action
export async function saveContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  // Jika validasi gagal, kembalikan message dan errors
  if (!validatedFields.success) {
    return {
      message: "Validasi gagal, silakan perbaiki form.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Jika validasi berhasil, simpan ke database
  try {
    await prisma.contactSubmission.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        message: validatedFields.data.message,
      },
    });
    // Kembalikan message sukses dan object errors kosong
    return { message: "Pesan berhasil terkirim!", errors: {} };
  } catch (e) {
    // Kembalikan message error dan object errors kosong
    return { message: "Gagal menyimpan pesan ke database.", errors: {} };
  }
}
```
**Fungsi Kode:**
*   `'use server'`: Menandai bahwa semua fungsi di dalam file ini adalah Server Actions dan hanya berjalan di server.
*   **Zod:** Kita menggunakan library `zod` untuk validasi data di server, ini lebih aman daripada validasi di client saja. (Jalankan `npm install zod`).
*   `saveContactSubmission`: Fungsi ini menerima `formData` langsung dari form. Ia melakukan validasi, dan jika berhasil, ia menggunakan `prisma.contactSubmission.create` untuk membuat entri baru di database.

#### Langkah 6: Refaktor Halaman Kontak

Terakhir, kita refaktor total halaman kontak untuk menggunakan Server Action dan menampilkan feedback.

**File: `src/app/(main)/contact/page.tsx` (Final)**
```typescript
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveContactSubmission } from '@/app/actions/contact';

const initialState = {
    message: null,
    errors: {},
};

// Komponen terpisah untuk Tombol Submit agar bisa menggunakan useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
    disabled={pending}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-colors disabled:bg-gray-400"
        >
        {pending ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
);
}

export default function ContactPage() {
    const [state, formAction] = useActionState(saveContactSubmission, initialState);

    return (
        <section className="p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8">Hubungi Saya</h2>
    <form action={formAction} className="max-w-lg mx-auto space-y-4">
    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Nama
        </label>
        <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
            </div>

            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Pesan
                        </label>
                        <textarea id="message" name="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                        {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
                                </div>

                                <SubmitButton />

                                {state.message && <p className="text-green-600 mt-4">{state.message}</p>}
                                        </form>
                                        </section>
);
}
```
**Fungsi Kode:**
*   `useFormState`: Hook untuk mengelola state form yang ditangani oleh Server Action. `state` akan berisi `message` atau `errors` yang dikembalikan dari `saveContactSubmission`.
*   `useFormStatus`: Hook yang hanya bisa digunakan di dalam komponen anak dari `<form>`. Ia memberikan status `pending` (apakah form sedang di-submit).
*   `<form action={formAction}>`: Kita tidak lagi menggunakan `onSubmit`. Atribut `action` yang diisi dengan Server Action akan secara otomatis menangani form submission dengan JavaScript di client, tetapi menjalankan logika di server.

### Tugas:
1.  Ikuti semua langkah di atas untuk menghubungkan form kontak Anda ke database.
2.  Pastikan Anda sudah membuat proyek Supabase dan menambahkan `DATABASE_URL` ke `.env.local`.
3.  Jalankan `npm install zod` dan `npm install @prisma/client`.
4.  Kirim pesan melalui form kontak dan periksa tabel `ContactSubmission` di Supabase untuk melihat apakah data berhasil masuk.

---

## Bab 9: Performa & Optimisasi Aplikasi

*   **Tujuan:** Mempelajari dan menerapkan teknik-teknik optimisasi kunci di Next.js untuk membuat aplikasi kita lebih cepat, lebih efisien, dan memberikan pengalaman pengguna yang lebih baik.
*   **Proyek:** Mengoptimalkan font, gambar, dan menganalisis ukuran aplikasi portofolio kita.

### Konsep Utama

*   **`next/font`:** Sistem optimisasi font dari Next.js. Ia akan mengunduh font pada saat *build time* dan menyajikannya dari domain Anda sendiri, menghilangkan permintaan jaringan tambahan ke Google Fonts, yang meningkatkan privasi dan performa.
*   **`next/image`:** Komponen gambar bawaan Next.js. Ia secara otomatis melakukan optimisasi gambar (resizing, format modern seperti WebP, lazy loading) untuk memastikan gambar dimuat secepat mungkin tanpa mengorbankan kualitas.
*   **Bundle Analyzer:** Sebuah alat bantu untuk memvisualisasikan ukuran dari setiap *package* JavaScript yang membentuk aplikasi Anda. Ini sangat berguna untuk mengidentifikasi library mana yang paling memakan tempat dan perlu dioptimalkan.

---

### Langkah-langkah Implementasi

#### Langkah 1: Optimisasi Font dengan `next/font`

Saat ini, aplikasi kita menggunakan font default dari browser. Mari kita ganti dengan kombinasi font yang lebih menarik dan efisien dari Google Fonts. Kita akan menggunakan "Inter" untuk teks utama dan "Poppins" untuk judul.

Buka file `src/app/layout.tsx` dan perbarui isinya.

**File: `src/app/layout.tsx` (Dengan Optimisasi Font)**
```typescript
import type { Metadata } from "next";
// 1. Impor font yang diinginkan dari next/font/google
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers";

// 2. Konfigurasi font
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Buat CSS variable untuk font ini
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '700'], // Tentukan ketebalan yang akan digunakan
  variable: '--font-poppins', // Buat CSS variable
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Terapkan variabel font ke tag <html>
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
```

Selanjutnya, kita perlu memberitahu Tailwind CSS cara menggunakan variabel font ini. Buka `tailwind.config.js` (atau `tailwind.config.ts`).

**File: `tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 4. Tambahkan fontFamily
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
```
Dengan ini, semua teks paragraf akan menggunakan font Inter, dan Anda bisa menggunakan kelas `font-mono` dari Tailwind untuk menerapkan font Poppins pada judul.

#### Langkah 2: Optimisasi Gambar dengan `next/image`

Halaman "Proyek" kita saat ini belum memiliki gambar. Mari kita tambahkan dan optimalkan.

**A. Perbarui Data Proyek**

Buka file halaman proyek Anda (kemungkinan di `src/app/(main)/projects/page.tsx` atau di mana Anda mendefinisikan `projectsData`) dan tambahkan properti `imageUrl` ke setiap objek proyek. Kita akan menggunakan layanan placeholder `https://placehold.co`.

```typescript
// Contoh data proyek yang diperbarui
const projectsData = [
  {
    title: 'Website Portofolio',
    description: 'Portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Proyek+1',
  },
  {
    title: 'Aplikasi To-Do List',
    description: 'Aplikasi sederhana untuk manajemen tugas harian.',
    tech: ['React', 'Zustand'],
    imageUrl: 'https://placehold.co/600x400/555555/FFFFFF/png?text=Proyek+2',
  },
  // ... proyek lainnya
];
```

**B. Perbarui Komponen `Card.tsx`**

Sekarang, modifikasi komponen `Card.tsx` untuk menerima `imageUrl` dan menampilkannya dengan `<Image>`.

**File: `src/app/components/Card.tsx` (Dengan Optimisasi Gambar)**
```typescript
import Image from 'next/image'; // 1. Impor komponen Image

export interface CardProps {
  title: string;
  description: string;
  tech: string[];
  imageUrl: string; // 2. Tambahkan imageUrl ke interface
}

const Card = ({ title, description, tech, imageUrl }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden h-full">
      {/* 3. Gunakan komponen Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Gambar screenshot dari proyek ${title}`}
          fill
          style={{ objectFit: 'cover' }} // atau gunakan className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
```
**Fungsi Kode:**
*   `import Image from 'next/image'`: Mengimpor komponen yang diperlukan.
*   `fill`: Prop ini membuat gambar mengisi elemen induknya (`div` dengan `relative w-full h-48`). Ini adalah cara modern untuk membuat gambar responsif.
*   `style={{ objectFit: 'cover' }}`: Memastikan gambar menutupi seluruh area tanpa distorsi, mirip seperti `background-size: cover`.

#### Langkah 3 (Opsional): Menganalisis Ukuran Bundle

Ingin tahu library mana yang paling besar di proyek Anda? Gunakan `@next/bundle-analyzer`.

**A. Instalasi**
```bash
npm install @next/bundle-analyzer
```

**B. Konfigurasi `next.config.ts`**
Buka `next.config.ts` dan bungkus konfigurasi Anda dengan `withBundleAnalyzer`.

**File: `next.config.ts`**
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi Next.js Anda lainnya di sini
};

module.exports = withBundleAnalyzer(nextConfig);
```

**C. Tambahkan Script ke `package.json`**
Buka `package.json` dan tambahkan script `analyze`.

**File: `package.json`**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true npm run build"
  },
  ...
}
```

Sekarang, setiap kali Anda menjalankan `npm run analyze`, proses build akan berjalan dan di akhir akan membuka dua tab di browser Anda yang menunjukkan visualisasi bundle untuk server dan client.

### Tugas:
1.  Terapkan optimisasi font menggunakan `next/font` di `layout.tsx` dan `tailwind.config.js`.
2.  Perbarui data proyek Anda dengan `imageUrl` dan modifikasi komponen `Card.tsx` untuk menggunakan `<Image>`.
3.  (Opsional) Coba jalankan bundle analyzer untuk melihat "peta" dari ukuran aplikasi Anda. Aplikasi

*   **Tujuan:** Mempelajari dan menerapkan teknik-teknik optimisasi kunci di Next.js untuk membuat aplikasi kita lebih cepat, lebih efisien, dan memberikan pengalaman pengguna yang lebih baik.
*   **Proyek:** Mengoptimalkan font, gambar, dan menganalisis ukuran aplikasi portofolio kita.

### Konsep Utama

*   **`next/font`:** Sistem optimisasi font dari Next.js. Ia akan mengunduh font pada saat *build time* dan menyajikannya dari domain Anda sendiri, menghilangkan permintaan jaringan tambahan ke Google Fonts, yang meningkatkan privasi dan performa.
*   **`next/image`:** Komponen gambar bawaan Next.js. Ia secara otomatis melakukan optimisasi gambar (resizing, format modern seperti WebP, lazy loading) untuk memastikan gambar dimuat secepat mungkin tanpa mengorbankan kualitas.
*   **Bundle Analyzer:** Sebuah alat bantu untuk memvisualisasikan ukuran dari setiap *package* JavaScript yang membentuk aplikasi Anda. Ini sangat berguna untuk mengidentifikasi library mana yang paling memakan tempat dan perlu dioptimalkan.

---

### Langkah-langkah Implementasi

#### Langkah 1: Optimisasi Font dengan `next/font`

Saat ini, aplikasi kita menggunakan font default dari browser. Mari kita ganti dengan kombinasi font yang lebih menarik dan efisien dari Google Fonts. Kita akan menggunakan "Inter" untuk teks utama dan "Poppins" untuk judul.

Buka file `src/app/layout.tsx` dan perbarui isinya.

**File: `src/app/layout.tsx` (Dengan Optimisasi Font)**
```typescript
import type { Metadata } from "next";
// 1. Impor font yang diinginkan dari next/font/google
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers";

// 2. Konfigurasi font
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Buat CSS variable untuk font ini
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '700'], // Tentukan ketebalan yang akan digunakan
  variable: '--font-poppins', // Buat CSS variable
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Terapkan variabel font ke tag <html>
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
```

Selanjutnya, kita perlu memberitahu Tailwind CSS cara menggunakan variabel font ini. Buka `tailwind.config.js` (atau `tailwind.config.ts`).

**File: `tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 4. Tambahkan fontFamily
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
```
Dengan ini, semua teks paragraf akan menggunakan font Inter, dan Anda bisa menggunakan kelas `font-mono` dari Tailwind untuk menerapkan font Poppins pada judul.

#### Langkah 2: Optimisasi Gambar dengan `next/image`

Halaman "Proyek" kita saat ini belum memiliki gambar. Mari kita tambahkan dan optimalkan.

**A. Perbarui Data Proyek**

Buka file halaman proyek Anda (kemungkinan di `src/app/(main)/projects/page.tsx` atau di mana Anda mendefinisikan `projectsData`) dan tambahkan properti `imageUrl` ke setiap objek proyek. Kita akan menggunakan layanan placeholder `https://placehold.co`.

```typescript
// Contoh data proyek yang diperbarui
const projectsData = [
  {
    title: 'Website Portofolio',
    description: 'Portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Proyek+1',
  },
  {
    title: 'Aplikasi To-Do List',
    description: 'Aplikasi sederhana untuk manajemen tugas harian.',
    tech: ['React', 'Zustand'],
    imageUrl: 'https://placehold.co/600x400/555555/FFFFFF/png?text=Proyek+2',
  },
  // ... proyek lainnya
];
```

**B. Perbarui Komponen `Card.tsx`**

Sekarang, modifikasi komponen `Card.tsx` untuk menerima `imageUrl` dan menampilkannya dengan `<Image>`.

**File: `src/app/components/Card.tsx` (Dengan Optimisasi Gambar)**
```typescript
import Image from 'next/image'; // 1. Impor komponen Image

export interface CardProps {
  title: string;
  description: string;
  tech: string[];
  imageUrl: string; // 2. Tambahkan imageUrl ke interface
}

const Card = ({ title, description, tech, imageUrl }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden h-full">
      {/* 3. Gunakan komponen Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Gambar screenshot dari proyek ${title}`}
          fill
          style={{ objectFit: 'cover' }} // atau gunakan className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
```
**Fungsi Kode:**
*   `import Image from 'next/image'`: Mengimpor komponen yang diperlukan.
*   `fill`: Prop ini membuat gambar mengisi elemen induknya (`div` dengan `relative w-full h-48`). Ini adalah cara modern untuk membuat gambar responsif.
*   `style={{ objectFit: 'cover' }}`: Memastikan gambar menutupi seluruh area tanpa distorsi, mirip seperti `background-size: cover`.

#### Langkah 3 (Opsional): Menganalisis Ukuran Bundle

Ingin tahu library mana yang paling besar di proyek Anda? Gunakan `@next/bundle-analyzer`.

**A. Instalasi**
```bash
npm install @next/bundle-analyzer
```

**B. Konfigurasi `next.config.ts`**
Buka `next.config.ts` dan bungkus konfigurasi Anda dengan `withBundleAnalyzer`.

**File: `next.config.ts`**
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi Next.js Anda lainnya di sini
};

module.exports = withBundleAnalyzer(nextConfig);
```

**C. Tambahkan Script ke `package.json`**
Buka `package.json` dan tambahkan script `analyze`.

**File: `package.json`**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true npm run build"
  },
  ...
}
```

Sekarang, setiap kali Anda menjalankan `npm run analyze`, proses build akan berjalan dan di akhir akan membuka dua tab di browser Anda yang menunjukkan visualisasi bundle untuk server dan client.

### Tugas:
1.  Terapkan optimisasi font menggunakan `next/font` di `layout.tsx` dan `tailwind.config.js`.
2.  Perbarui data proyek Anda dengan `imageUrl` dan modifikasi komponen `Card.tsx` untuk menggunakan `<Image>`.
3.  (Opsional) Coba jalankan bundle analyzer untuk melihat "peta" dari ukuran aplikasi Anda.

---

## Bab 10: Deployment & Produksi

* **Tujuan:** Mendeploy aplikasi ke Vercel dan membuatnya dapat diakses secara publik.
* **Proyek:** Meluncurkan blog portofolio Anda.

### Penjelasan Langkah:

* **Variabel Lingkungan:** Memisahkan *secrets* (kunci API, URL database) dari kode adalah praktik keamanan yang krusial. Vercel menyediakan UI untuk menyimpan variabel ini dengan aman untuk lingkungan produksi.
* **Build Command:** Pastikan perintah build di Vercel atau di `package.json` Anda menyertakan `prisma generate` sebelum `next build`.
    ```json
    // package.json
    "scripts": {
      "build": "prisma generate && next build"
    }
    ```
* **Migrasi Produksi:** Perintah `npx prisma migrate deploy` dirancang untuk lingkungan produksi. Ini hanya akan menerapkan migrasi yang belum dijalankan ke database. Anda biasanya menjalankan ini secara manual atau melalui hook di platform hosting Anda setelah deployment.
* **Alur Kerja CI/CD:** *Continuous Integration/Continuous Deployment* adalah praktik di mana setiap `git push` ke repositori secara otomatis memicu proses *build* dan *deployment*. Vercel melakukan ini secara *out-of-the-box*.

### Tugas:
1.  Buat akun di [Vercel](https://vercel.com) dan hubungkan dengan akun GitHub Anda.
2.  Buat repositori baru di GitHub dan unggah kode proyek Anda.
3.  Impor repositori tersebut ke Vercel untuk membuat proyek baru.
4.  Konfigurasikan semua *Environment Variables* yang ada di file `.env.local` Anda ke dalam pengaturan proyek di Vercel.
5.  Pastikan proses build berhasil dan aplikasi Anda dapat diakses melalui URL yang disediakan Vercel. Bagikan URL tersebut!
