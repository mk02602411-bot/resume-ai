import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // <-- इम्पोर्ट करें

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" reverseOrder={false} /> {/* <-- जोड़ें */}
      </body>
    </html>
  );
}