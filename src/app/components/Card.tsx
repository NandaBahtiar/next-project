import React from 'react'

export interface CardProps {
    id: number;
    title: string;
    description: string;
    name: string;
    html_url: string;
    homepage: string;
}

const Card = ({ id, homepage, description, html_url, name }: CardProps) => {
    return (
        <div
            key={id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:border-blue-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1 pr-2">
                    {name}
                </h3>
                <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                {description || "Tidak ada deskripsi tersedia"}
            </p>

            {/* Footer */}
            <div className="mt-auto flex flex-row justify-end gap-2">
                {/* Conditional Web Button - only show if homepage exists */}
                {homepage && (
                    <div className="flex items-center justify-between">
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            Web
                        </a>
                    </div>
                )}

                {/* GitHub Repo Button - always shown */}
                <div className="flex items-center justify-between">
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        Github Repo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card