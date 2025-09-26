import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartPage } from '@/components/cart/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart | Infinity Zone',
  description: 'Review your selected items and proceed to checkout.',
};

export default function Cart() {
  return (
    <main className="min-h-screen">
      <Header />
      <CartPage />
      <Footer />
    </main>
  );
}