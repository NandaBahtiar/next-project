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
        <div className="max-w-lg mx-auto space-y-4">
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
                required
            />
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
                required
            />
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
                required
            />
          </div>

          <button
              onClick={(e) => {
                e.preventDefault();
                alert(`Pesan terkirim: ${JSON.stringify(formData)}`);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-colors"
          >
            Kirim Pesan
          </button>
        </div>
      </section>
  );
};

export default ContactPage;