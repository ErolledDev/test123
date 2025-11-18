// src/lib/auth.ts
'use client';

export function checkAuth(password: string): boolean {
  return password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('isAdminAuthenticated') === 'true';
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return;
  if (value) {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  } else {
    sessionStorage.removeItem('isAdminAuthenticated');
  }
}
