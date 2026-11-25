import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ProductImage({ src, alt, title, className = '' }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EFEA] via-[#EAE5DC] to-[#DFD8CC] p-6 text-center text-[#5E5850] ${className}`}
      >
        <svg
          width="36"
          height="48"
          viewBox="0 0 36 48"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#8B6B4A]"
        >
          <rect x="12" y="2" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M14 11V15H22V11" stroke="currentColor" strokeWidth="1.4" />
          <rect x="6" y="15" width="24" height="30" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <line x1="11" y1="26" x2="25" y2="26" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        <span className="font-display text-lg font-medium text-[#1C1A17]">{title}</span>
        <span className="mt-1 text-xs tracking-wide text-[#5E5850]">Maison Léon Flacon</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
