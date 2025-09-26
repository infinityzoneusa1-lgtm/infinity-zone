'use client';

import { useState } from 'react';
import { AffiliateApplication } from '@/types/applications';
import { Mail, Phone, Globe, Users, TrendingUp, DollarSign, Check, AlertCircle } from 'lucide-react';

export default function AffiliateApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Partial<AffiliateApplication>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    marketingChannels: [],
    audienceSize: '',
    audienceDemographics: '',
    previousAffiliateExperience: false,
    website: '',
    socialMedia: {
      instagram: '',
      youtube: '',
      tiktok: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      blog: ''
    },
    promotionStrategy: '',
    contentTypes: [],
    expectedMonthlyPromotions: '',
    agreeToTerms: false,
    agreeToCommissionStructure: false,
    preferredPaymentMethod: 'paypal',
    paymentDetails: ''
  });

  const marketingChannels = [
    'Social Media',
    'Email Marketing',
    'Blog/Website',
    'YouTube',
    'TikTok',
    'Instagram',
    'Facebook',
    'Paid Advertising',
    'Influencer Marketing',
    'Content Marketing'
  ];

  const contentTypes = [
    'Product Reviews',
    'Tutorials',
    'Unboxing Videos',
    'Before/After Photos',
    'Social Media Posts',
    'Blog Articles',
    'Email Campaigns',
    'Live Streams',
    'Stories/Reels',
    'Comparison Content'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof AffiliateApplication] as any),
          [child]: value
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
    const current = (formData[field as keyof AffiliateApplication] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    handleInputChange(field, updated);
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.marketingChannels?.length && formData.audienceSize && formData.audienceDemographics);
      case 3:
        return !!(formData.promotionStrategy && formData.contentTypes?.length && formData.expectedMonthlyPromotions);
      case 4:
        return !!(formData.agreeToTerms && formData.agreeToCommissionStructure && formData.preferredPaymentMethod && formData.paymentDetails);
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
      const applicationData: AffiliateApplication = {
        ...formData as AffiliateApplication,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/applications/affiliate', {
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Audience & Marketing</h2>
              <p className="text-gray-600">Help us understand your audience and reach</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Marketing Channels * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {marketingChannels.map((channel) => (
                  <label key={channel} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingChannels?.includes(channel)}
                      onChange={() => handleArrayToggle('marketingChannels', channel)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audience Size *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.audienceSize}
                  onChange={(e) => handleInputChange('audienceSize', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select your audience size"
                >
                  <option value="">Select your audience size</option>
                  <option value="0-1k">0 - 1,000</option>
                  <option value="1k-5k">1,000 - 5,000</option>
                  <option value="5k-10k">5,000 - 10,000</option>
                  <option value="10k-50k">10,000 - 50,000</option>
                  <option value="50k-100k">50,000 - 100,000</option>
                  <option value="100k+">100,000+</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audience Demographics *
              </label>
              <textarea
                value={formData.audienceDemographics}
                onChange={(e) => handleInputChange('audienceDemographics', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your audience (age, gender, interests, location, etc.)..."
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.previousAffiliateExperience}
                  onChange={(e) => handleInputChange('previousAffiliateExperience', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I have previous affiliate marketing experience
                </span>
              </label>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Social Media Profiles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="text"
                    value={formData.socialMedia?.instagram}
                    onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                  <input
                    type="text"
                    value={formData.socialMedia?.youtube}
                    onChange={(e) => handleInputChange('socialMedia.youtube', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Channel URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                  <input
                    type="text"
                    value={formData.socialMedia?.tiktok}
                    onChange={(e) => handleInputChange('socialMedia.tiktok', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.blog}
                    onChange={(e) => handleInputChange('socialMedia.blog', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourblog.com"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketing Strategy</h2>
              <p className="text-gray-600">Tell us about your promotional approach</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promotion Strategy *
              </label>
              <textarea
                value={formData.promotionStrategy}
                onChange={(e) => handleInputChange('promotionStrategy', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe how you plan to promote our products..."
              />
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
                Expected Monthly Promotions *
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.expectedMonthlyPromotions}
                  onChange={(e) => handleInputChange('expectedMonthlyPromotions', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select expected monthly promotions"
                >
                  <option value="">Select frequency</option>
                  <option value="1-5">1-5 promotions</option>
                  <option value="6-10">6-10 promotions</option>
                  <option value="11-20">11-20 promotions</option>
                  <option value="20+">20+ promotions</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment & Legal</h2>
              <p className="text-gray-600">Final details and agreements</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Payment Method *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.preferredPaymentMethod}
                  onChange={(e) => handleInputChange('preferredPaymentMethod', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select preferred payment method"
                >
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Details *
              </label>
              <input
                type="text"
                value={formData.paymentDetails}
                onChange={(e) => handleInputChange('paymentDetails', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="PayPal email, bank details, or mailing address"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Commission Structure</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 10% commission on all sales</li>
                <li>• Monthly payments (minimum $50)</li>
                <li>• 30-day cookie duration</li>
                <li>• Real-time tracking dashboard</li>
              </ul>
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
                  checked={formData.agreeToCommissionStructure}
                  onChange={(e) => handleInputChange('agreeToCommissionStructure', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the commission structure and payment terms outlined above *
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
                  Thank you for your interest in becoming an affiliate partner. We'll review your application and get back to you within 2-3 business days.
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