import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TermConditionHeroSection } from "@/components/terms-and-conditions/hero-section";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TermConditionHeroSection />
      <section className="flex justify-center px-4 py-10 bg-gray-50">
        <div className="max-w-3xl w-full border border-gray-300 rounded-xl bg-white p-6 md:p-10 text-gray-800 text-sm md:text-base leading-relaxed">
          <ol className="space-y-4 list-decimal list-inside">
            <li>
              <strong>Acceptance of Terms</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  By accessing or using the Website, you agree to be bound by
                  these Terms and Conditions and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this site.
                </li>
              </ol>
            </li>

            <li>
              <strong>Use of the Website</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  You must be at least 18 years old to use this website. By
                  using this website and by agreeing to these terms and
                  conditions, you warrant and represent that you are at least 18
                  years of age.
                </li>
                <li>
                  You are granted a limited, non-exclusive, revocable license to
                  access and use the Website strictly in accordance with these
                  terms.
                </li>
              </ol>
            </li>

            <li>
              <strong>User Account</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  In order to access certain features of the Website, you may be
                  required to register for an account. You agree to provide
                  accurate and complete information when creating your account.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account and password, and you agree to accept
                  responsibility for all activities that occur under your
                  account.
                </li>
              </ol>
            </li>

            <li>
              <strong>Intellectual Property Rights</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  The Website and its original content, features, and
                  functionality are owned by Infinity Zone Marketplace and are
                  protected by international copyright, trademark, patent, trade
                  secret, and other intellectual property or proprietary rights
                  laws.
                </li>
                <li>
                  You agree not to reproduce, duplicate, copy, sell, resell or
                  exploit any portion of the Website without express written
                  permission from us.
                </li>
              </ol>
            </li>

            <li>
              <strong>Limitation of Liability</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  The Website and its affiliates shall not be liable for any
                  damages including but not limited to indirect, incidental,
                  special, consequential, or exemplary damages.
                </li>
                <li>
                  We shall not be liable for any damage or losses arising out of
                  your use of or reliance on the information presented on the
                  Website.
                </li>
              </ol>
            </li>

            <li>
              <strong>Indemnification</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  You agree to indemnify, defend, and hold harmless the Website
                  and its affiliates from and against all claims, liabilities,
                  damages, losses, costs, or expenses.
                </li>
              </ol>
            </li>

            <li>
              <strong>Affiliates</strong>
              <p className="pl-4 mt-2">
                The Website may engage in partnerships with affiliates. However,
                we do not assume responsibility for their actions or content.
              </p>
            </li>

            <li>
              <strong>Termination</strong>
              <p className="pl-4 mt-2">
                We reserve the right to terminate or suspend your access to the
                Website immediately, with or without notice, for any reason
                whatsoever, including breach of these terms.
              </p>
            </li>

            <li>
              <strong>Governing Law</strong>
              <p className="pl-4 mt-2">
                Any claim relating to the Website shall be governed by the laws
                of the jurisdiction of the Website owner without regard to its
                conflict of law provisions.
              </p>
            </li>

            <li>
              <strong>Changes to Terms</strong>
              <ol className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                <li>
                  We reserve the right to modify or replace these terms at any
                  time. Material changes will be communicated via our website.
                </li>
                <li>
                  By continuing to use the Website, you signify your acceptance
                  of these terms and conditions.
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
