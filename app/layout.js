import { Manrope, Kanit } from 'next/font/google';

import '@styles/globals.css';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ToastProvider from '@components/UI/ToastProvider';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const kanit = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: {
    template: '%s | Ryxel Store',
    default: 'Welcome | Ryxel Store',
  },
  description:
    'High-end gaming gears like gaming mouses, gaming keyboards, chairs, ... for the best gaming experience in Vietnam. Free shipping for orders over 1,000,000 VND. Shop now!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${manrope.variable} ${kanit.variable}`}>
      <body
        className={
          'flex min-h-screen flex-col bg-secondary-100 text-primary-default antialiased'
        }
      >
        <Header />
        <ToastProvider>{children}</ToastProvider>
        <Footer />
      </body>
    </html>
  );
}
