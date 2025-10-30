'use client';

export default function Card({ 
  image, 
  title, 
  description, 
  onClick,
  className = '' 
}) {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}