'use client'

import StyledComponentsRegistry from "./lib/registry"
import GlobalStyles from "@/styles/GlobalStyle"

import Header from "../components/Header";

export const metadata = {
  title: 'BlockSmith',
}

export default function RootLayout({
  children,
}:{ 
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body> 
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}