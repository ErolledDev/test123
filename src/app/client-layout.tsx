// src/app/client-layout.tsx
'use client'

import Providers from './providers'
import '@fontsource/inter'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}