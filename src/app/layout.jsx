import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAT Unlimited",
  description: "Level up your SAT question solving skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
