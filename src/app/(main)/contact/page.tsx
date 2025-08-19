'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name) {
      newErrors.name = 'Nama tidak boleh kosong.';
    }
    if (!formData.email) {
      newErrors.email = 'Email tidak boleh kosong.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }
    if (!formData.message) {
      newErrors.message = 'Pesan tidak boleh kosong.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Pesan terkirim: ${JSON.stringify(formData)}`);
    // Di aplikasi nyata, Anda akan mengirim data ini ke API atau Server Action
    setFormData({ name: '', email: '', message: '' });
    setErrors({}); // Reset errors
  };

  return (
    <section className="p-8 md:p-16">
      <h2 className="text-3xl font-bold mb-8">Hubungi Saya</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-colors"
        >
          Kirim Pesan
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
