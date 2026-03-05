'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff)', padding: '1rem' }}>
          <div style={{ maxWidth: '28rem', width: '100%', background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              오류가 발생했습니다
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              {error.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            <button
              onClick={reset}
              style={{
                width: '100%',
                padding: '0.5rem 1.5rem',
                background: '#a47764',
                color: 'white',
                fontWeight: '500',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
