"use client";

import React, { useState, useEffect } from 'react';
import Loading from '@/app/(main)/loading';

// Props untuk komponen generik baru kita
interface ApiDrivenListProps<T> {
  // URL endpoint API yang akan di-fetch
  endpoint: string;
  // Fungsi untuk me-render setiap item
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  itemsPerPage?: number; // Prop opsional untuk item per halaman
}

// Komponen generik yang sekarang menjadi Client Component
const ApiDrivenList = <T extends { id: number | string }>({
  endpoint,
  renderItem,
  className,
  itemsPerPage = 10, // Default 10 item per halaman
}: ApiDrivenListProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Tambahkan parameter paginasi ke endpoint
        const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=${itemsPerPage}&page=${page}`;
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error(`Gagal mengambil data dari ${url}`);
        }

        const data: T[] = await res.json();
        setItems(data);

        // Jika data yang kembali kurang dari itemsPerPage, anggap ini halaman terakhir
        if (data.length < itemsPerPage) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

      } catch (error) {
        console.error(error);
        setItems([]); // Reset item jika terjadi error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page, itemsPerPage]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center py-12">
            <Loading />
        </div>
    );
  }

  if (items.length === 0) {
    return <p>Tidak ada data untuk ditampilkan.</p>;
  }

  return (
    <div>
      <div className={className}>
        {items.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>

      {/* Kontrol Paginasi */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        <span className="text-lg font-medium">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={isLastPage || isLoading}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default ApiDrivenList;