/**
 * SubscribeButton Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

interface SubscribeButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function SubscribeButton({ className, children }: SubscribeButtonProps) {
  const handleClick = () => {
    alert('Stripe integration coming soon! This will redirect to a secure checkout page.');
  };

  return (
    <button
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
