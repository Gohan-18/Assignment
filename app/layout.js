import './globals.css';

export const metadata = {
  title: 'Assignment',
  description: 'KernelPi - Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
