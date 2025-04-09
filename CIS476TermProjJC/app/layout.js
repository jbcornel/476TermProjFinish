// // app/layout.js
// import './globals.css'; // optional: global styles
// import { MediatorProvider } from '@/components/MediatorContext';

// export const metadata = {
//   title: 'DriveShare',
//   description: 'Peer-to-Peer Car Rental Platform',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <MediatorProvider>
//           {children}
//         </MediatorProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.js
import { MediatorProvider } from "@/components/MediatorContext";
import Navbar from "@/components/NavBar";
import "./globals.css"; // Your global CSS styles

export const metadata = {
  title: "MyApp",
  description: "My Next.js Application",
};

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
