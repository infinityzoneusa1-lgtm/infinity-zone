import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/about/hero-section";
import { WelcomeSection } from "@/components/about/welcome-section";
import { BusinessDevelopmentSection } from "@/components/about/business-development-section";
import { DreamsSection } from "@/components/about/dreams-section";
import { InvestmentSection } from "@/components/about/investment-section";
import { RealEstateServicesSection } from "@/components/about/real-estate-services-section";
import { InnovationSection } from "@/components/about/innovation-section";
import { SustainabilitySection } from "@/components/about/sustainability-section";
import { CommunitySection } from "@/components/about/community-section";
import { generateSEO, pagesSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO(pagesSEO.about);

// Enhanced About sections
function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering beauty, luxury, and lifestyle through innovation, sustainability, and community
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To democratize access to premium beauty products and create sustainable opportunities 
              for entrepreneurs worldwide through our comprehensive marketplace platform.
            </p>
          </div>
          
          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most trusted platform where beauty meets opportunity, 
              fostering a global community of empowered entrepreneurs and satisfied customers.
            </p>
          </div>
          
          <div className="text-center p-8 bg-green-50 rounded-2xl">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, inclusivity, innovation, and sustainability guide every decision we make, 
              ensuring we create lasting positive impact for all stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Co-Founder",
      image: "/placeholder-user.jpg",
      bio: "15+ years in beauty industry, former VP at L'Oréal",
      linkedin: "#"
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-Founder", 
      image: "/placeholder-user.jpg",
      bio: "Tech entrepreneur with 3 successful exits, MIT graduate",
      linkedin: "#"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Partnerships",
      image: "/placeholder-user.jpg",
      bio: "Former Amazon marketplace director, partnership expert",
      linkedin: "#"
    },
    {
      name: "David Chen",
      role: "Head of Product",
      image: "/placeholder-user.jpg",
      bio: "UX/UI expert with 10+ years at Google and Airbnb",
      linkedin: "#"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced leaders passionate about revolutionizing the beauty and lifestyle industry
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  Connect
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { number: "50K+", label: "Active Users", icon: "👥" },
    { number: "500+", label: "Partner Vendors", icon: "🏪" },
    { number: "25K+", label: "Products Sold", icon: "📦" },
    { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
    { number: "24/7", label: "Customer Support", icon: "💬" },
    { number: "150+", label: "Countries Served", icon: "🌍" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">InfinityZone by the Numbers</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            See the impact we're making in the beauty and lifestyle industry worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.number}</div>
              <div className="text-purple-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WelcomeSection />
      <MissionSection />
      <BusinessDevelopmentSection />
      <TeamSection />
      <StatsSection />
      <DreamsSection />
      <InvestmentSection />
      <RealEstateServicesSection />
      <InnovationSection />
      <SustainabilitySection />
      <CommunitySection />
      <Footer />
    </main>
  );
}