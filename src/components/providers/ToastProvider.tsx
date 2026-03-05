'use client';

import dynamic from 'next/dynamic';

const ToastContainer = dynamic(
  () => import('@/components/ui/Toast').then((mod) => mod.ToastContainer),
  { ssr: false }
);

/**
 * 토스트 알림 제공자
 * 레이아웃의 최상단에 추가해야 합니다
 */
export function ToastProvider() {
  return <ToastContainer />;
}
