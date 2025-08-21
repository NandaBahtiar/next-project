'use server';

import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';

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
        console.error("Error saving contact submission:", e);
        return { message: `Gagal menyimpan pesan ke database: ${e instanceof Error ? e.message : 'Unknown error'}`, errors: {} };
    }
}