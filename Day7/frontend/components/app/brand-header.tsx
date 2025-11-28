'use client';

interface BrandHeaderProps {
  brandName?: string;
}

export function BrandHeader({ brandName = 'QuickBasket' }: BrandHeaderProps) {
  return (
    <div className="fixed top-6 left-6 z-50">
      <h1 className="text-white text-lg font-semibold tracking-wide">{brandName}</h1>
    </div>
  );
}
