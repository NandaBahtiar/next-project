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

## Bab 7: Autentikasi & Keamanan dengan Auth.js v5

* **Tujuan:** Menambahkan fungsionalitas login/logout menggunakan Auth.js (NextAuth v5) dan melindungi rute.
* **Proyek:** Membuat halaman "Dashboard" yang hanya bisa diakses setelah login.

### Contoh Kode & Penjelasan:

1.  **Install:** `npm install next-auth@beta`

2.  **`auth.ts` (di root proyek)**
    ```typescript
    import NextAuth from "next-auth"
    import GitHub from "next-auth/providers/github"

    export const { handlers, signIn, signOut, auth } = NextAuth({
      providers: [
        GitHub({
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
      ],
    })
    ```
    **Fungsi Kode:**
    * File ini adalah pusat konfigurasi Auth.js.
    * `NextAuth({ ... })`: Menginisialisasi Auth.js dengan provider (misalnya, GitHub).
    * `export const { ... }`: Mengekspor fungsi-fungsi penting: `handlers` (untuk API routes), `signIn`, `signOut` (untuk digunakan di komponen), dan `auth` (untuk mengambil sesi di server).
    * *Catatan: Tambahkan `AUTH_SECRET`, `AUTH_GITHUB_ID`, dan `AUTH_GITHUB_SECRET` ke file `.env.local`.*

3.  **`src/app/api/auth/[...nextauth]/route.ts`**
    ```typescript
    import { handlers } from "@/auth" // Referensi ke auth.ts
    export const { GET, POST } = handlers
    ```
    **Fungsi Kode:**
    * File ini hanya mengekspor `handlers` dari `auth.ts` untuk membuat API endpoint yang diperlukan Auth.js.

4.  **`middleware.ts` (di root proyek)**
    ```typescript
    import { auth } from "@/auth"

    export default auth((req) => {
      // Logika middleware di sini jika perlu
      // Jika tidak ada logika khusus, middleware akan otomatis melindungi rute
    })

    // Melindungi semua rute kecuali yang ditentukan
    export const config = {
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    }
    ```
    **Fungsi Kode:**
    * Middleware Auth.js secara default akan melindungi semua halaman dan mengalihkan pengguna yang belum login ke halaman sign-in.
    * `matcher`: Mengonfigurasi rute mana yang akan dijalankan oleh middleware. Pola ini mengecualikan file statis dan API.

### Tugas:
1.  Buat komponen `AuthButton.tsx` yang menampilkan tombol "Sign In" jika pengguna belum login, dan tombol "Sign Out" jika sudah login.
2.  Gunakan fungsi `signIn` dan `signOut` yang diekspor dari `auth.ts` untuk menangani klik tombol.
3.  Untuk mendapatkan sesi di komponen klien, gunakan hook `useSession` dari `next-auth/react`. (Anda perlu membungkus layout dengan `<SessionProvider>`).
4.  Letakkan `AuthButton` di `Navbar.tsx`.

---

## Bab 8: Integrasi Database dengan Prisma + Supabase

* **Tujuan:** Mengganti data dari API statis menjadi data dari database PostgreSQL Supabase.
* **Proyek:** Mengubah "Proyek" menjadi "Post Blog" yang disimpan di database.

### Contoh Kode & Penjelasan:

1.  **`prisma/schema.prisma`**
    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    model Post {
      id          Int      @id @default(autoincrement())
      title       String
      content     String?
      published   Boolean  @default(false)
      createdAt   DateTime @default(now())
      updatedAt   DateTime @updatedAt
    }
    ```
    **Fungsi Kode:**
    * `model Post`: Mendefinisikan tabel `Post` di database.
    * `id Int @id ...`: Mendefinisikan kolom `id` sebagai **Primary Key** yang bertambah otomatis.
    * *Catatan: Dapatkan `DATABASE_URL` dari **Project Settings > Database > Connection string** di Supabase. Jalankan `npx prisma migrate dev` untuk sinkronisasi.*

2.  **Halaman Blog: `src/app/(main)/blog/page.tsx`**
    ```typescript
    import prisma from '@/lib/prisma'; // Asumsikan prisma client diinisialisasi di lib/prisma.ts

    const BlogPage = async () => {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      });

      return (
        <section className="p-8 md:p-16">
          <h1 className="text-3xl font-bold mb-8">Blog Saya</h1>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id}>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-700 mt-2">{post.content}</p>
              </article>
            ))}
          </div>
        </section>
      );
    };

    export default BlogPage;
    ```
    **Fungsi Kode:**
    * `await prisma.post.findMany(...)`: Mengambil data dari database menggunakan Prisma Client.
    * `where: { published: true }`: Opsi untuk memfilter hasil, hanya mengambil post yang sudah dipublikasikan.
    * `orderBy: { createdAt: 'desc' }`: Mengurutkan hasil dari yang terbaru.

### Tugas:
1.  Buat halaman admin sederhana di `/dashboard/posts/create` yang hanya bisa diakses oleh pengguna yang sudah login.
2.  Halaman ini harus berisi formulir untuk membuat post blog baru (judul dan konten).
3.  Buat **Server Action** untuk menangani submit form tersebut.
4.  Server Action harus menggunakan `prisma.post.create()` untuk menyimpan post baru ke database Supabase Anda.

---

## Bab 9: Performa & Optimisasi

* **Tujuan:** Menerapkan praktik terbaik untuk membuat aplikasi lebih cepat dan efisien.
* **Proyek:** Mengoptimalkan gambar dan *font* di aplikasi blog.

### Contoh Kode & Penjelasan:

1.  **Menggunakan `next/image` (Sintaks Terbaru)**
    ```typescript
    import Image from 'next/image';

    // Di dalam komponen Card atau sejenisnya
    <div className="relative h-48 w-full">
      <Image
        src="/path/to/image.jpg"
        alt="Deskripsi Gambar"
        fill // Mengisi parent container
        className="object-cover" // Mirip object-fit: cover
      />
    </div>
    ```
    **Fungsi Kode:**
    * `<Image>`: Komponen ini secara otomatis melakukan **resizing**, menyajikan **format modern** (WebP), dan menerapkan **lazy loading**.
    * `fill`: Prop ini membuat gambar mengisi elemen induknya. Induk harus memiliki `position: relative`.
    * `className="object-cover"`: Menggunakan kelas Tailwind untuk mengontrol bagaimana gambar ditampilkan, menggantikan prop `objectFit` yang sudah usang.

2.  **Menggunakan `next/font`**
    ```typescript
    import { Poppins } from 'next/font/google';

    const poppins = Poppins({
      weight: ['400', '700'],
      subsets: ['latin'],
      display: 'swap', // Wajib ada
    });

    // di layout.tsx
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
    ```
    **Fungsi Kode:**
    * `next/font` secara otomatis mengoptimalkan pemuatan font pada saat *build time*.
    * Ini akan mengunduh file font dan menyajikannya dari domain Anda sendiri, menghilangkan permintaan tambahan ke Google Fonts, yang meningkatkan performa dan privasi.
    * Ini juga secara otomatis mengatur properti CSS untuk mencegah **Cumulative Layout Shift (CLS)**.

### Tugas:
1.  Tambahkan kolom `imageUrl` (string) ke model `Post` Anda di `schema.prisma` dan jalankan migrasi.
2.  Saat menampilkan daftar post di halaman blog, gunakan komponen `<Image>` dari `next/image` untuk menampilkan gambar setiap post. Gunakan placeholder jika URL gambar tidak ada.
3.  Gunakan `next/font` untuk menerapkan font yang berbeda untuk judul (`<h1>`, `<h2>`) dan teks paragraf biasa di seluruh aplikasi Anda.

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
