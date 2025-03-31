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
      <body>
        {/* ✅ Use ClientLayout for normal users, AdminLayout will handle itself */}
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* ✅ Use ClientLayout for normal users, AdminLayout will handle itself */}
          {isAdminPage ? children : <ClientLayout>{children}</ClientLayout>}
        </MantineProvider>      </body>
    </html>
  );
}
