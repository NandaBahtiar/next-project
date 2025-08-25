# Panduan Implementasi Notifikasi Email dengan Resend

Dokumen ini menjelaskan cara mengintegrasikan layanan email Resend ke dalam aplikasi Next.js Anda untuk mengirim notifikasi setiap kali ada pesan kontak baru yang masuk.

### Langkah 1: Konfigurasi Resend (Wajib Dilakukan Manual)

Langkah ini tidak bisa saya lakukan untuk Anda dan harus Anda kerjakan sendiri di website Resend.

1.  **Daftar Akun:** Buka [resend.com](https://resend.com) dan buat akun baru (bisa menggunakan akun Google/GitHub).
2.  **Tambah & Verifikasi Domain:**
    *   Di dashboard Resend, pergi ke menu **Domains**.
    *   Klik **Add Domain** dan masukkan nama domain Anda (jika Anda punya, jika tidak Anda bisa melewati ini tapi email akan dikirim dari `onboarding@resend.dev`).
    *   Resend akan memberikan beberapa record DNS (tipe TXT, CNAME/MX) yang perlu Anda tambahkan di pengaturan DNS provider domain Anda (Netlify, Vercel, Namecheap, dll). Ini adalah langkah penting agar email Anda tidak masuk spam.
3.  **Buat API Key:**
    *   Pergi ke menu **API Keys**.
    *   Klik **Create API Key**.
    *   Beri nama (misalnya, "Next-Project-Key"), set *Permission* ke **Full Access**, lalu klik **Create**.
    *   **PENTING:** Salin API Key yang muncul. Anda hanya bisa melihatnya sekali. Simpan di tempat aman untuk sementara.

### Langkah 2: Instalasi Library Resend

Jalankan perintah berikut di terminal proyek Anda untuk menginstal library Resend:
```bash
npm install resend
```

### Langkah 3: Konfigurasi Environment Variable

1.  Buat file baru di direktori utama proyek Anda bernama `.env.local`.
2.  Masukkan API Key yang sudah Anda salin ke dalam file tersebut seperti ini:
    ```
    RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
    ```
    Ganti `re_xxxxxxxxxxxxxxxxxxxx` dengan API Key Anda.
3.  **Amankan API Key:** Pastikan file `.env.local` tidak terunggah ke GitHub. Buka file `.gitignore` Anda dan tambahkan baris berikut jika belum ada:
    ```
    .env.local
    ```

### Langkah 4: Membuat Template Email (Best Practice)

Membuat komponen React untuk template email membuat email Anda terlihat profesional.

1.  Buat folder baru: `src/app/components/emails`.
2.  Buat file baru di dalamnya: `src/app/components/emails/NewMessageEmail.tsx`.
3.  Isi dengan kode berikut:

    ```tsx
    import React from 'react';

    interface NewMessageEmailProps {
      name: string;
      email: string;
      message: string;
    }

    export const NewMessageEmail: React.FC<Readonly<NewMessageEmailProps>> = ({
      name,
      email,
      message,
    }) => (
      <div>
        <h1>Pesan Baru dari Website Portfolio!</h1>
        <p>
          Anda telah menerima pesan baru dari formulir kontak.
        </p>
        <hr />
        <ul>
          <li><strong>Nama:</strong> {name}</li>
          <li><strong>Email:</strong> {email}</li>
        </ul>
        <hr />
        <h2>Isi Pesan:</h2>
        <p>{message}</p>
      </div>
    );
    ```

### Langkah 5: Modifikasi Server Action `saveContactSubmission`

Buka file `src/app/actions/contact.ts` dan perbarui isinya untuk menambahkan logika pengiriman email.

```ts
'use server';

import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import { NewMessageEmail } from '@/app/components/emails/NewMessageEmail'; // <-- Impor template email

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY); // <-- Inisialisasi Resend

// ... (skema Zod dan type ContactFormState tetap sama) ...
const contactSchema = z.object({
    name: z.string().min(3, { message: "Nama harus lebih dari 2 karakter." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    message: z.string().min(5, { message: "Pesan harus lebih dari 10 karakter." }),
});

export type ContactFormState = {
    message: string | null;
    errors?: { name?: string[]; email?: string[]; message?: string[]; };
};


export async function saveContactSubmission(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: "Validasi gagal, silakan perbaiki form.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, message } = validatedFields.data;

    try {
        // 1. Simpan data ke database (tetap sama)
        await prisma.contactSubmission.create({
            data: { name, email, message },
        });

        // 2. Kirim notifikasi email setelah berhasil menyimpan
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev', // Ganti dengan email domain Anda jika sudah diverifikasi
                to: 'emailpenerima@example.com', // << GANTI DENGAN EMAIL ANDA
                subject: `Pesan Baru dari ${name}`,
                react: NewMessageEmail({ name, email, message }), // <-- Gunakan komponen React sebagai isi email
            });
        } catch (emailError) {
            console.error("Gagal mengirim email:", emailError);
            // Jika email gagal, jangan gagalkan seluruh proses.
            // Cukup kembalikan pesan sukses dengan catatan.
            return { message: "Pesan berhasil terkirim, namun notifikasi email gagal dikirim.", errors: {} };
        }

        return { message: "Pesan berhasil terkirim dan notifikasi email telah dikirim!", errors: {} };

    } catch (e) {
        console.error("Error saving contact submission:", e);
        return { message: `Gagal menyimpan pesan: ${e instanceof Error ? e.message : 'Unknown error'}`, errors: {} };
    }
}

// ... (fungsi lainnya tetap sama) ...
```

**PENTING:** Jangan lupa ganti `'emailpenerima@example.com'` dengan alamat email Anda yang sebenarnya.
