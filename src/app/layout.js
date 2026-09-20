import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export const metadata = {
  title: "Foodly | Order Your Favorite Food Online",
  description: "Discover amazing restaurants, delicious meals, and get your food delivered to your door with Foodly."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
