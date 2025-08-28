import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PrivacyPolicyHeroSection } from "@/components/privacy-policy/hero-section";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PrivacyPolicyHeroSection />
      <section className="flex justify-center px-4 py-10 bg-gray-50">
        <div className="max-w-3xl w-full border border-gray-300 rounded-xl bg-white p-6 md:p-10 text-gray-800 text-sm md:text-base leading-relaxed">
          <ol className="space-y-4 list-decimal list-inside">
            <li>
              <strong>Information We Collect</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  <strong>Personal Information:</strong> When you register for
                  an account, place an order, or engage in certain other
                  activities on our website, we may ask you to provide personal
                  information such as your name, email address, shipping
                  address, and payment information.
                </li>
                <li>
                  <strong>Usage Information:</strong> We may collect information
                  about how you interact with our website, including your IP
                  address, browser type, operating system, and pages visited.
                  This helps us improve the user experience and optimize our
                  website.
                </li>
              </ol>
            </li>

            <li>
              <strong>Use of Information</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We use the information we collect to provide, maintain, and
                  improve our services, including fulfilling orders, processing
                  payments, and communicating with you about your account.
                </li>
                <li>
                  We may also use your information to personalize your
                  experience on the website, show you relevant content and
                  advertisements, and detect and prevent fraud and abuse.
                </li>
              </ol>
            </li>

            <li>
              <strong>Sharing of Information</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We may share your personal information with third-party
                  service providers who assist us in providing and improving our
                  services, such as payment processors, shipping carriers, and
                  marketing partners.
                </li>
                <li>
                  We may also share aggregated or de-identified information with
                  third parties for analytical or research purposes, but such
                  information will not personally identify you.
                </li>
              </ol>
            </li>

            <li>
              <strong>Cookies and Tracking Technologies</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We use cookies and similar tracking technologies to collect
                  information about your interactions with our website and to
                  improve your browsing experience.
                </li>
                <li>
                  You can control cookies through your browser settings and opt
                  out of certain tracking technologies, but disabling cookies
                  may affect functionality.
                </li>
              </ol>
            </li>

            <li>
              <strong>Data Security</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We take reasonable measures to protect the security of your
                  personal information and to prevent unauthorized access,
                  disclosure, alteration, or destruction.
                </li>
                <li>
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure, and we cannot guarantee the
                  absolute security of your information.
                </li>
              </ol>
            </li>

            <li>
              <strong>Changes to Privacy Policy</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We reserve the right to update or modify this Privacy Policy
                  at any time without prior notice. Any changes will be
                  effective immediately upon posting the updated Privacy Policy
                  on the website.
                </li>
                <li>
                  Your continued use of the website after such changes
                  constitutes your acceptance of the revised Privacy Policy.
                </li>
              </ol>
            </li>

            <li>
              <strong>Contact Us</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  If you have any questions or concerns about this Privacy
                  Policy or our practices regarding your personal information,
                  please contact us at{" "}
                  <a
                    href="mailto:info@infinityzonemarketplace.com"
                    className="text-blue-600 underline"
                  >
                    info@infinityzonemarketplace.com
                  </a>
                  .
                </li>
                <li>
                  By using our website, you consent to the collection and use of
                  your personal information as described in this Privacy Policy.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  );
}
