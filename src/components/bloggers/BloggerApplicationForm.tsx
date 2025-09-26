'use client';

import { useState } from 'react';
import { BloggerApplication } from '@/types/applications';
import { Mail, Phone, Globe, Users, FileText, Camera, Check, AlertCircle } from 'lucide-react';

export default function BloggerApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Partial<BloggerApplication>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    blogName: '',
    blogUrl: '',
    blogNiche: [],
    monthlyPageViews: '',
    socialFollowing: {},
    postingFrequency: '',
    contentTypes: [],
    writingStyle: '',
    previousBrandCollaborations: '',
    collaborationTypes: [],
    rateExpectations: '',
    availabilityTimeline: '',
    portfolioLinks: [],
    mediaKit: '',
    agreeToTerms: false,
    agreeToGuidelines: false
  });

  const blogNiches = [
    'Beauty & Skincare',
    'Fashion & Style',
    'Lifestyle',
    'Health & Wellness',
    'Food & Nutrition',
    'Travel',
    'Technology',
    'Home & Decor',
    'Parenting',
    'Fitness'
  ];

  const contentTypes = [
    'Blog Posts',
    'Product Reviews',
    'Tutorials',
    'Lookbooks',
    'Gift Guides',
    'Seasonal Content',
    'Comparison Posts',
    'Personal Stories',
    'Educational Content',
    'Trend Reports'
  ];

  const collaborationTypes = [
    'Sponsored Posts',
    'Product Reviews',
    'Giveaways',
    'Ambassador Programs',
    'Event Coverage',
    'Social Media Campaigns',
    'Video Content',
    'Email Features',
    'Long-term Partnerships'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof BloggerApplication] as any),
          [child]: field.includes('socialFollowing') ? Number(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const current = (formData[field as keyof BloggerApplication] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    handleInputChange(field, updated);
  };

  const handlePortfolioChange = (index: number, value: string) => {
    const current = [...(formData.portfolioLinks || [])];
    current[index] = value;
    handleInputChange('portfolioLinks', current);
  };

  const addPortfolioLink = () => {
    const current = [...(formData.portfolioLinks || [])];
    current.push('');
    handleInputChange('portfolioLinks', current);
  };

  const removePortfolioLink = (index: number) => {
    const current = [...(formData.portfolioLinks || [])];
    current.splice(index, 1);
    handleInputChange('portfolioLinks', current);
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.location);
      case 2:
        return !!(formData.blogName && formData.blogUrl && formData.blogNiche?.length && 
                 formData.monthlyPageViews && formData.postingFrequency);
      case 3:
        return !!(formData.contentTypes?.length && formData.writingStyle && 
                 formData.collaborationTypes?.length && formData.availabilityTimeline);
      case 4:
        return !!(formData.agreeToTerms && formData.agreeToGuidelines);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const applicationData: BloggerApplication = {
        ...formData as BloggerApplication,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/applications/blogger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStep(5);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Information</h2>
              <p className="text-gray-600">Tell us about your blog and audience</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Name *
                </label>
                <input
                  type="text"
                  value={formData.blogName}
                  onChange={(e) => handleInputChange('blogName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your Blog Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.blogUrl}
                    onChange={(e) => handleInputChange('blogUrl', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourblog.com"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Blog Niche * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogNiches.map((niche) => (
                  <label key={niche} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.blogNiche?.includes(niche)}
                      onChange={() => handleArrayToggle('blogNiche', niche)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{niche}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Page Views *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.monthlyPageViews}
                    onChange={(e) => handleInputChange('monthlyPageViews', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    aria-label="Select monthly page views"
                  >
                    <option value="">Select range</option>
                    <option value="0-1k">0 - 1,000</option>
                    <option value="1k-5k">1,000 - 5,000</option>
                    <option value="5k-10k">5,000 - 10,000</option>
                    <option value="10k-25k">10,000 - 25,000</option>
                    <option value="25k-50k">25,000 - 50,000</option>
                    <option value="50k+">50,000+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posting Frequency *
                </label>
                <select
                  value={formData.postingFrequency}
                  onChange={(e) => handleInputChange('postingFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select posting frequency"
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="2-3-weekly">2-3 times per week</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Social Media Following</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Followers</label>
                  <input
                    type="number"
                    value={formData.socialFollowing?.instagram || ''}
                    onChange={(e) => handleInputChange('socialFollowing.instagram', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Subscribers</label>
                  <input
                    type="number"
                    value={formData.socialFollowing?.youtube || ''}
                    onChange={(e) => handleInputChange('socialFollowing.youtube', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Followers</label>
                  <input
                    type="number"
                    value={formData.socialFollowing?.tiktok || ''}
                    onChange={(e) => handleInputChange('socialFollowing.tiktok', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pinterest Followers</label>
                  <input
                    type="number"
                    value={formData.socialFollowing?.pinterest || ''}
                    onChange={(e) => handleInputChange('socialFollowing.pinterest', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content & Collaboration</h2>
              <p className="text-gray-600">Tell us about your content style and collaboration preferences</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Content Types * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contentTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.contentTypes?.includes(type)}
                      onChange={() => handleArrayToggle('contentTypes', type)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Writing Style *
              </label>
              <textarea
                value={formData.writingStyle}
                onChange={(e) => handleInputChange('writingStyle', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your writing style and tone..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Brand Collaborations
              </label>
              <textarea
                value={formData.previousBrandCollaborations}
                onChange={(e) => handleInputChange('previousBrandCollaborations', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List any previous brand partnerships or collaborations..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Preferred Collaboration Types * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {collaborationTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.collaborationTypes?.includes(type)}
                      onChange={() => handleArrayToggle('collaborationTypes', type)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Expectations
                </label>
                <select
                  value={formData.rateExpectations}
                  onChange={(e) => handleInputChange('rateExpectations', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select rate expectations"
                >
                  <option value="">Select range</option>
                  <option value="product-only">Product Only</option>
                  <option value="$50-100">$50 - $100</option>
                  <option value="$100-250">$100 - $250</option>
                  <option value="$250-500">$250 - $500</option>
                  <option value="$500+">$500+</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Timeline *
                </label>
                <select
                  value={formData.availabilityTimeline}
                  onChange={(e) => handleInputChange('availabilityTimeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select availability timeline"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-week">Within 1 week</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio & Legal</h2>
              <p className="text-gray-600">Share your work and agree to our terms</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Portfolio Links
              </label>
              {(formData.portfolioLinks || ['']).map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handlePortfolioChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/your-post"
                  />
                  <button
                    type="button"
                    onClick={() => removePortfolioLink(index)}
                    className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPortfolioLink}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                + Add Portfolio Link
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Kit URL
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.mediaKit}
                  onChange={(e) => handleInputChange('mediaKit', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Link to your media kit or rate card"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-purple-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a> *
                </span>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToGuidelines}
                  onChange={(e) => handleInputChange('agreeToGuidelines', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to follow FTC disclosure guidelines and brand content standards *
                </span>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-12">
            {submitStatus === 'success' ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in collaborating with us! We'll review your application and blog within 1-2 business days.
                </p>
                <p className="text-sm text-gray-500">
                  You'll receive a confirmation email shortly with your application details and next steps.
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Submission Failed</h2>
                <p className="text-gray-600 mb-6">
                  There was an error submitting your application. Please try again or contact support.
                </p>
                <button
                  onClick={() => setStep(4)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = validateStep(step);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        {step <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    stepNumber <= step
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber < step ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-label={`Application progress: step ${step} of 4`}>
              <div
                className={`bg-purple-600 h-2 rounded-full transition-all duration-300 ${
                  step === 1 ? 'w-1/4' :
                  step === 2 ? 'w-2/4' :
                  step === 3 ? 'w-3/4' :
                  step === 4 ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {step <= 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  step === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Previous
              </button>

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isStepValid
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid || isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isStepValid && !isSubmitting
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}