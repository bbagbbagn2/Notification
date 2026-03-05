'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/lib/store';
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

// Toast 아이콘 맵
const iconMap = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

// Toast 색상 맵 - 프로젝트의 시맨틱 컬러 사용
const colorMap = {
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'text-emerald-600',
    text: 'text-emerald-900',
    '제거-bg': 'hover:bg-emerald-100',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    text: 'text-red-900',
    '제거-bg': 'hover:bg-red-100',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    text: 'text-amber-900',
    '제거-bg': 'hover:bg-amber-100',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-900',
    '제거-bg': 'hover:bg-blue-100',
  },
};

function Toast({ id, message, type, onClose }: ToastProps) {
  const colors = colorMap[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="animate-toast-enter">
      <div
        className={`
          flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg
          ${colors.bg} ${colors.border} ${colors.text}
          backdrop-blur-sm
        `}
      >
        {/* 아이콘 */}
        <div className={`mt-0.5 shrink-0 ${colors.icon}`}>
          {iconMap[type]}
        </div>

        {/* 메시지 */}
        <div className="flex-1 wrap-break-word text-sm font-medium">
          {message}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={() => onClose(id)}
          className={`
            mt-0.5 shrink-0 p-1 rounded transition-colors
            ${colors.icon} ${colors['제거-bg']}
            hover:opacity-70 active:scale-95
          `}
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer() {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-50 flex flex-col gap-3 p-4 sm:right-4 sm:top-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Toast
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={removeNotification}
          />
        </div>
      ))}
    </div>
  );
}

export default Toast;
