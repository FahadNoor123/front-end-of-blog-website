"use client"
import ClientLayout from '../components/ClientLayout';
import { usePathname } from 'next/navigation';
import { MantineProvider } from "@mantine/core";
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin'); // ✅ Detect Admin Pages

  return (
    <html lang="en">
       <head>
        {/* Google Analytics */}
        <Script 
          async 
          src={`https://www.googletagmanager.com/gtag/js?id=G-4HYRL328L7`}
          strategy="afterInteractive"
        />
        <Script 
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4HYRL328L7');
            `,
          }}
        />
      </head>
      <body>
        {/* ✅ Use ClientLayout for normal users, AdminLayout will handle itself */}
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* ✅ Use ClientLayout for normal users, AdminLayout will handle itself */}
          {isAdminPage ? children : <ClientLayout>{children}</ClientLayout>}
        </MantineProvider>      </body>
    </html>
  );
}
