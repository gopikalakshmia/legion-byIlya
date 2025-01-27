import "./globals.css";
import { Kanit, Judson, Open_Sans, Jost } from 'next/font/google'
import Navigation from "./shared/components/navigation";
import Footer from "./shared/components/footer";


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',  
  themeColor: '#191C27'
}

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-primary'
})

const judson = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-secondary'
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-text'
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-nav'
})

export const metadata = {
  metadataBase: new URL('https://legion-three.vercel.app/'),
  title: {
    default: 'American Legion WMC',
    template: '%s | American Legion WMC'
  },
  description: 'The American Legion War Memorial Commission is dedicated to honoring veterans through memorial preservation, community events, and veteran support activities. Join us in commemorating military service and fostering veteran connections.',
  authors: [
    { name: 'Ilya Rozhkov', url: 'https://www.byilya.com' }
  ],
  creator: 'Ilya Rozhkov',
  publisher: 'byilya.com',
  openGraph: {
    type: 'website',
    title: 'The American Legion War Memorial Commission',
    siteName: 'The American Legion War Memorial Commission',
    description: 'Dedicated to honoring veterans through memorial preservation, community events, and veteran support activities. Join us in commemorating military service and fostering veteran connections.',
    images: [{
      url: '/og-home.jpg',
      width: 1200,
      height: 630,
      alt: 'War Memorial Veterans Building'
    }]
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`
      ${kanit.variable} 
      ${judson.variable} 
      ${openSans.variable} 
      ${jost.variable} 
      `}>

      <body>
          <Navigation />
          {children}
          <Footer />
      </body>
    </html>
  );
}
