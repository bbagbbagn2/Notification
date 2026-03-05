'use client';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%', background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#a47764' }}>
            404
          </div>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          페이지를 찾을 수 없습니다
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          요청하신 페이지가 없거나 삭제되었습니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a
            href="/"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem 1.5rem',
              background: '#a47764',
              color: 'white',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#8b6752';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#a47764';
            }}
          >
            홈으로 돌아가기
          </a>
          <button
            onClick={() => (typeof window !== 'undefined' && window.history) && window.history.back()}
            style={{
              width: '100%',
              padding: '0.5rem 1.5rem',
              background: '#f3f4f6',
              color: '#374151',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = '#f3f4f6';
            }}
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
