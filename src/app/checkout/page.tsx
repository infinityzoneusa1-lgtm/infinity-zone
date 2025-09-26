import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckoutPage } from '@/components/checkout/CheckoutPage';
import { SecuritySection } from '@/components/common/TrustBadges';

export const metadata: Metadata = {
  title: 'Secure Checkout | Infinity Zone',
  description: 'Complete your purchase securely with our streamlined checkout process. SSL encrypted and PCI compliant.',
};

export default function Checkout() {
  return (
    <main className="min-h-screen">
      <Header />
      <CheckoutPage />
      <SecuritySection />
      <Footer />
    </main>
  );
}
