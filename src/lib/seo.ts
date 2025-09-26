import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const DEFAULT_SEO = {
  title: 'InfinityZone - Premium Beauty & Luxury Products',
  description: 'Discover premium beauty products, luxury items, and professional services at InfinityZone. Join our community of vendors, affiliates, and content creators.',
  keywords: 'beauty products, luxury items, skincare, makeup, affiliate program, vendor marketplace, content creators, professional services',
  image: '/.jpg',
  url: 'https://infinityzone.com',
  type: 'website' as const,
  author: 'InfinityZone',
};

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} - InfinityZone` : DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoImage = image || DEFAULT_SEO.image;
  const seoUrl = url || DEFAULT_SEO.url;
  const seoAuthor = author || DEFAULT_SEO.author;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: 'InfinityZone',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(DEFAULT_SEO.url),
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: 'InfinityZone',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: 'en_US',
      type: type === 'product' ? 'website' : type,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@InfinityZone',
      site: '@InfinityZone',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Add article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [seoAuthor],
    };
  }

  // Add product-specific metadata
  if (type === 'product') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'website', // Use website type for products as Next.js doesn't support product type
    };
  }

  return metadata;
}

// Structured data generators
export function generateOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'InfinityZone',
    url: 'https://infinityzone.com',
    logo: 'https://infinityzone.com/main-logo.png',
    description: 'Premium beauty products, luxury items, and professional services marketplace',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-INFINITY',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://facebook.com/infinityzone',
      'https://twitter.com/infinityzone',
      'https://instagram.com/infinityzone',
      'https://linkedin.com/company/infinityzone',
    ],
  };
}

export function generateWebsiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'InfinityZone',
    url: 'https://infinityzone.com',
    description: 'Premium beauty products, luxury items, and professional services marketplace',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://infinityzone.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateProductLD(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  category: string;
  brand: string;
  sku?: string;
  reviews?: {
    rating: number;
    reviewCount: number;
  };
}) {
  const productLD: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: 'InfinityZone',
      },
    },
  };

  if (product.sku) {
    productLD.sku = product.sku;
  }

  if (product.reviews) {
    productLD.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.reviews.rating,
      reviewCount: product.reviews.reviewCount,
    };
  }

  return productLD;
}

export function generateBreadcrumbLD(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateFAQLD(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Page-specific SEO configurations
export const pagesSEO = {
  home: {
    title: 'Premium Beauty & Luxury Products Marketplace',
    description: 'Discover premium beauty products, luxury items, and professional services at InfinityZone. Join our community of vendors, affiliates, and content creators.',
    keywords: 'beauty products, luxury marketplace, skincare, makeup, premium cosmetics, affiliate program, vendor platform',
  },
  about: {
    title: 'About Us - Our Story & Mission',
    description: 'Learn about InfinityZone\'s mission to provide premium beauty products and create opportunities for vendors, affiliates, and content creators worldwide.',
    keywords: 'about infinityzone, company story, mission, beauty marketplace, team',
  },
  products: {
    title: 'Premium Beauty Products & Luxury Items',
    description: 'Browse our curated collection of premium beauty products, skincare, makeup, and luxury items from top brands and trusted vendors.',
    keywords: 'beauty products, premium cosmetics, luxury skincare, makeup, beauty tools, skincare routine',
  },
  services: {
    title: 'Professional Beauty & Consultation Services',
    description: 'Discover our range of professional beauty services including consultations, training sessions, and personalized beauty experiences.',
    keywords: 'beauty services, professional consultation, makeup training, skincare advice, beauty expert',
  },
  vendors: {
    title: 'Become a Vendor - Join Our Marketplace',
    description: 'Join InfinityZone as a vendor and reach thousands of customers looking for premium beauty products. Apply now to start selling.',
    keywords: 'become vendor, sell beauty products, vendor application, marketplace, business opportunity',
  },
  affiliates: {
    title: 'Affiliate Program - Earn Commission',
    description: 'Join our affiliate program and earn commissions by promoting premium beauty products. Start earning with our competitive rates.',
    keywords: 'affiliate program, earn commission, beauty affiliate, marketing opportunity, passive income',
  },
  bloggers: {
    title: 'Blogger Partnership Program',
    description: 'Partner with InfinityZone as a beauty blogger. Get access to products, exclusive content, and monetization opportunities.',
    keywords: 'blogger partnership, beauty blogging, content creator, influencer program, brand collaboration',
  },
  contentCreators: {
    title: 'Content Creator Program',
    description: 'Join our content creator program and collaborate with InfinityZone to create engaging beauty content across social media platforms.',
    keywords: 'content creator, social media, beauty content, influencer, brand partnership, creative collaboration',
  },
  internships: {
    title: 'Internship Program - Launch Your Career',
    description: 'Join our internship program and gain valuable experience in marketing, development, design, and more. Apply now for career opportunities.',
    keywords: 'internship program, career opportunities, student jobs, professional development, marketing internship',
  },
  contact: {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions about our products or services? Contact the InfinityZone team. We\'re here to help with all your beauty needs.',
    keywords: 'contact infinityzone, customer service, support, beauty questions, help',
  },
  professionals: {
    title: 'Professional Services Directory',
    description: 'Connect with certified beauty professionals, makeup artists, and skincare specialists through our professional services platform.',
    keywords: 'beauty professionals, makeup artists, skincare specialists, professional services, beauty experts',
  },
};