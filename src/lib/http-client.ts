/**
 * Axios 인터셉터를 통한 자동 에러 핸들링
 * API 요청/응답에서 자동으로 토스트 알림 처리
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useNotificationStore } from '@/lib/store';

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  });

  // 요청 인터셉터
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 요청 전 처리 (토큰 추가 등)
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const addNotification = useNotificationStore.getState().addNotification;

      // 네트워크 에러
      if (!error.response) {
        addNotification({
          type: 'error',
          message: '네트워크 연결을 확인해주세요.',
          duration: 5000,
        });
        return Promise.reject(error);
      }

      // HTTP 에러 처리
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 400:
          addNotification({
            type: 'error',
            message: data?.message || '잘못된 요청입니다.',
            duration: 5000,
          });
          break;
        case 401:
          addNotification({
            type: 'error',
            message: '로그인이 필요합니다.',
            duration: 4000,
          });
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          addNotification({
            type: 'error',
            message: '접근 권한이 없습니다.',
            duration: 4000,
          });
          break;
        case 404:
          addNotification({
            type: 'error',
            message: '요청한 리소스를 찾을 수 없습니다.',
            duration: 4000,
          });
          break;
        case 500:
          addNotification({
            type: 'error',
            message: '서버 오류가 발생했습니다. 관리자에게 연락해주세요.',
            duration: 6000,
          });
          break;
        default:
          addNotification({
            type: 'error',
            message: data?.message || '오류가 발생했습니다.',
            duration: 5000,
          });
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export const httpClient = createHttpClient();
