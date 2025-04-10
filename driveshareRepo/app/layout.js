import { MediatorProvider } from "@/components/MediatorContext";
import Navbar from "@/components/NavBar";
import "./globals.css";

export const metadata = {
  title: "MyApp",
  description: "My Next.js Application",
};
//nest ui within mediatorProvider
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MediatorProvider>
          <Navbar />
          <main style={{ padding: "1rem" }}>
            {children}
          </main>
        </MediatorProvider>
      </body>
    </html>
  );
}
