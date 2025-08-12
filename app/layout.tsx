export const metadata = { title: 'Wild Waypoints' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'system-ui, sans-serif', margin:0, padding:20}}>
        {children}
      </body>
    </html>
  );
}
