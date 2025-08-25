'use server';

import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';
import {revalidatePath} from "next/cache";

const prisma = new PrismaClient();

// Definisikan skema validasi menggunakan Zod
const contactSchema = z.object({
    name: z.string().min(3, { message: "Nama harus lebih dari 2 karakter." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    message: z.string().min(5, { message: "Pesan harus lebih dari 10 karakter." }),
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
        console.error("Error saving contact submission:", e);
        return { message: `Gagal menyimpan pesan ke database: ${e instanceof Error ? e.message : 'Unknown error'}`, errors: {} };
    }
}
export async function deleteSubmission(id: number) {
        // Server Action untuk menghapus data berdasarkan ID
    try {
    await prisma.contactSubmission.delete({
            where: { id },
         });
      // Beritahu Next.js untuk memuat ulang data di halaman '/dashboard'
      // Ini akan memperbarui tampilan tanpa perlu me-refresh seluruh halaman
       revalidatePath('/dashboard');

      // Mengembalikan status sukses
        return { success: true, message: 'Pesan berhasil dihapus.' };

      } catch (error) {
       console.error('Gagal menghapus pesan:', error);
        // Mengembalikan status gagal
       return { success: false, message: 'Gagal menghapus pesan.' };
    }
}

// ... (fungsi lainnya tetap sama)

// Nama fungsi diperbaiki dari Chackbox -> Checkbox
export async function changeCheckboxStatus(id: number) {
    try {
        // 1. Ambil data submission saat ini untuk mengetahui status isRead
        const submission = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!submission) {
            return { success: false, message: 'Pesan tidak ditemukan.' };
        }

        // 2. Lakukan update dengan data baru
        await prisma.contactSubmission.update({
            where: {
                id: id,
            },
            data: {
                // 3. Ubah nilai isRead menjadi kebalikannya
                isRead: !submission.isRead,
            },
        });

        revalidatePath('/dashboard');

        // 4. Kembalikan pesan sukses yang sesuai
        return { success: true, message: 'Status pesan berhasil diperbarui.' };

    } catch (error) {
        console.error('Gagal memperbarui status pesan:', error);
        return { success: false, message: 'Gagal memperbarui status pesan.' };
    }
}