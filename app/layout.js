import './globals.css';

export const metadata = {
  title: 'Assignment',
  description: 'Find jobs quickely',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
