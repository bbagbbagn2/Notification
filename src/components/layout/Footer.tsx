'use client';

import { Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-text mb-3 text-lg font-bold">Plainlog</h3>
            <p className="text-text-light text-sm leading-relaxed">
              개발을 기록하고 공유하는 공간입니다. TIL, 회고, 학습 내용을 정리합니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text mb-3 text-lg font-bold">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-text-light hover:text-primary text-sm transition-colors"
                >
                  홈
                </a>
              </li>
              <li>
                <a
                  href="/posts"
                  className="text-text-light hover:text-primary text-sm transition-colors"
                >
                  전체 글
                </a>
              </li>
              <li>
                <a
                  href="/write"
                  className="text-text-light hover:text-primary text-sm transition-colors"
                >
                  글쓰기
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text mb-3 text-lg font-bold">연락처</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/bbagbbagn2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary p-2 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:pyoungh137@gmail.com"
                className="text-text-light hover:text-primary p-2 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-text-light flex items-center justify-center gap-1 text-sm">
            © {currentYear} Plainlog. Made with using Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
