import { client } from '@/components/inputForm';
import './globals.css';
import { ApolloProvider } from '@apollo/react-hooks';

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
