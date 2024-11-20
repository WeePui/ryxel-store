import { Manrope, Kanit } from 'next/font/google';

import '@styles/globals.css';
import Header from '@components/Header';

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
    'High-end gaming gears like gaming mouses, gaming keyboards, chairs, ... for the best gaming experience in Vietnam. Free shipping for orders over 1,000,000 VND. Shop n ow!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${manrope.variable} ${kanit.variable}`}>
      <body
        className={'bg-secondary-100 flex flex-col antialiased min-h-screen'}
      >
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <footer>Copyright by Ryxel Store</footer>
      </body>
    </html>
  );
}
