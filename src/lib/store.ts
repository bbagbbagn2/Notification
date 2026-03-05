/**
 * Zustand를 사용한 글로벌 상태 관리
 * 최신 프론트엔드 개발에서 권장하는 간단한 상태 관리 솔루션
 */
import { create } from 'zustand';

// UI 상태
interface UIState {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  isMobileView: boolean;
  toggleDarkMode: () => void;
  setMenuOpen: (open: boolean) => void;
  setMobileView: (mobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isMenuOpen: false,
  isMobileView: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setMobileView: (mobile) => set({ isMobileView: mobile }),
}));

// 필터 상태
interface FilterState {
  selectedCategory: string | null;
  selectedTags: string[];
  searchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: null,
  selectedTags: [],
  searchQuery: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  reset: () =>
    set({
      selectedCategory: null,
      selectedTags: [],
      searchQuery: '',
    }),
}));

// 사용자 상태
interface AuthState {
  user: { id: string; email: string; name: string } | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: AuthState['user']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, error: null }),
}));

// 알림 상태
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id },
      ],
    }));

    if (notification.duration) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, notification.duration);
    }
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
