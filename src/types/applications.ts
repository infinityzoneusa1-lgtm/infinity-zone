// Application Types
export interface VendorApplication {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Business Information
  businessName: string;
  businessType: 'individual' | 'llc' | 'corporation' | 'partnership';
  businessAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessRegistrationNumber?: string;
  taxId: string;
  
  // Product Information
  productCategories: string[];
  productDescription: string;
  estimatedMonthlyVolume: string;
  priceRange: string;
  
  // Banking Information
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  
  // Additional Information
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  experience: string;
  whyJoinUs: string;
  
  // Legal Agreements
  agreeToTerms: boolean;
  agreeToCommission: boolean;
  
  // Status and Timestamps
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface AffiliateApplication {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Marketing Information
  marketingChannels: string[];
  audienceSize: string;
  audienceDemographics: string;
  previousAffiliateExperience: boolean;
  
  // Platform Information
  website?: string;
  socialMedia: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    blog?: string;
  };
  
  // Marketing Strategy
  promotionStrategy: string;
  contentTypes: string[];
  expectedMonthlyPromotions: string;
  
  // Legal and Payment
  agreeToTerms: boolean;
  agreeToCommissionStructure: boolean;
  preferredPaymentMethod: 'paypal' | 'bank_transfer' | 'check';
  paymentDetails: string;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface BloggerApplication {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  // Blogging Information
  blogName: string;
  blogUrl: string;
  blogNiche: string[];
  monthlyPageViews: string;
  socialFollowing: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
    facebook?: number;
    twitter?: number;
    pinterest?: number;
  };
  
  // Content Information
  postingFrequency: string;
  contentTypes: string[];
  writingStyle: string;
  previousBrandCollaborations: string;
  
  // Collaboration Preferences
  collaborationTypes: string[];
  rateExpectations: string;
  availabilityTimeline: string;
  
  // Portfolio
  portfolioLinks: string[];
  mediaKit?: string;
  
  // Legal
  agreeToTerms: boolean;
  agreeToGuidelines: boolean;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface ContentCreatorApplication {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  
  // Creator Information
  creatorName: string;
  platforms: string[];
  primaryPlatform: string;
  followerCounts: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
    facebook?: number;
    twitter?: number;
    snapchat?: number;
    twitch?: number;
  };
  
  // Content Information
  contentCategories: string[];
  contentStyle: string;
  postingFrequency: string;
  averageEngagementRate: string;
  
  // Collaboration Information
  previousBrandDeals: string;
  rateCard?: string;
  preferredCollaborationTypes: string[];
  equipmentQuality: string;
  
  // Portfolio
  portfolioLinks: string[];
  bestPerformingContent: string[];
  
  // Legal
  agreeToTerms: boolean;
  agreeToContentGuidelines: boolean;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface InternshipApplication {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Education Information
  currentEducationLevel: 'high_school' | 'undergraduate' | 'graduate' | 'other';
  schoolName: string;
  major?: string;
  expectedGraduation: string;
  gpa?: number;
  
  // Internship Preferences
  preferredDepartments: string[];
  internshipType: 'paid' | 'unpaid' | 'for_credit';
  availableStartDate: string;
  duration: string;
  hoursPerWeek: string;
  
  // Experience and Skills
  relevantExperience: string;
  skills: string[];
  languages: string[];
  
  // Documents
  resume?: string;
  coverLetter: string;
  portfolioUrl?: string;
  references?: {
    name: string;
    relationship: string;
    email: string;
    phone: string;
  }[];
  
  // Legal
  agreeToTerms: boolean;
  agreeToBackground: boolean;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}