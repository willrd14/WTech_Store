import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import ProductForm from "./pages/Admin/ProductForm";
import AdminOrders from "./pages/Admin/AdminOrders";
import AddToCartPopup from "./components/AddToCartPopup/AddToCartPopup";
import { useCart } from "./context/CartContext";

function AppContent() {
  const { showPopup, lastAdded, closePopup } = useCart();

  return (
    <>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
      <AddToCartPopup show={showPopup} product={lastAdded} onClose={closePopup} />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden">
      <Header />
      <AppContent />
      <Footer />
    </div>
  );
}
