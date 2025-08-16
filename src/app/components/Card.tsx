import React from 'react'
export interface CardProps {
    title:string;
    description:string;
    tech:string[];
}

const Card = ({title,description,tech}:CardProps) => {
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

export default Card
