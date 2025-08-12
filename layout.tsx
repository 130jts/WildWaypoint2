import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import SWRegister from '@/components/SWRegister';
import InstallPWA from '@/components/InstallPWA';

export const metadata = {
  title: 'Wild Waypoints',
  description: "Nature's pit stop – connect with wildlife migration and native plants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#184E3B" />
      </head>
      <body>
        <header>
          <Image src="/logo.png" alt="logo" width={32} height={32}/>
          <strong>Wild Waypoints</strong>
          <nav style={{display:'flex',gap:8}}>
            <Link href="/">Home</Link>
            <Link href="/map">Map</Link>
            <Link href="/species">Species</Link>
            <Link href="/plants">Plants</Link>
            <Link href="/my-waypoint">My Waypoint</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div style={{marginLeft:'auto'}}><InstallPWA /></div>
        </header>
        <div className="container">{children}</div>
        <SWRegister />
      </body>
    </html>
  );
}
