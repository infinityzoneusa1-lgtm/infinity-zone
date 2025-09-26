'use client';

import { useState } from 'react';
import { ContentCreatorApplication } from '@/types/applications';
import { Mail, Phone, MapPin, Camera, Users, TrendingUp, Check, AlertCircle } from 'lucide-react';

export default function ContentCreatorApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Partial<ContentCreatorApplication>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    age: 0,
    creatorName: '',
    platforms: [],
    primaryPlatform: '',
    followerCounts: {},
    contentCategories: [],
    contentStyle: '',
    postingFrequency: '',
    averageEngagementRate: '',
    previousBrandDeals: '',
    rateCard: '',
    preferredCollaborationTypes: [],
    equipmentQuality: '',
    portfolioLinks: [],
    bestPerformingContent: [],
    agreeToTerms: false,
    agreeToContentGuidelines: false
  });

  const platforms = [
    'Instagram',
    'TikTok',
    'YouTube',
    'Facebook',
    'Twitter',
    'Snapchat',
    'Twitch',
    'Pinterest',
    'LinkedIn'
  ];

  const contentCategories = [
    'Beauty & Makeup',
    'Fashion & Style',
    'Lifestyle',
    'Fitness & Health',
    'Food & Cooking',
    'Travel',
    'Technology',
    'Gaming',
    'Comedy',
    'Education',
    'Music',
    'Art & Design'
  ];

  const collaborationTypes = [
    'Sponsored Posts',
    'Product Reviews',
    'Unboxing Videos',
    'Tutorials',
    'Brand Ambassador',
    'Giveaways',
    'Takeovers',
    'Live Streams',
    'Story Features',
    'Reels/TikToks'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ContentCreatorApplication] as any),
          [child]: field.includes('followerCounts') ? Number(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: field === 'age' ? Number(value) || 0 : value
      }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const current = (formData[field as keyof ContentCreatorApplication] as string[]) || [];
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

  const handleBestContentChange = (index: number, value: string) => {
    const current = [...(formData.bestPerformingContent || [])];
    current[index] = value;
    handleInputChange('bestPerformingContent', current);
  };

  const addBestContent = () => {
    const current = [...(formData.bestPerformingContent || [])];
    current.push('');
    handleInputChange('bestPerformingContent', current);
  };

  const removeBestContent = (index: number) => {
    const current = [...(formData.bestPerformingContent || [])];
    current.splice(index, 1);
    handleInputChange('bestPerformingContent', current);
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && 
                 formData.location && formData.age && formData.age >= 13);
      case 2:
        return !!(formData.creatorName && formData.platforms?.length && formData.primaryPlatform &&
                 formData.contentCategories?.length);
      case 3:
        return !!(formData.contentStyle && formData.postingFrequency && formData.averageEngagementRate &&
                 formData.preferredCollaborationTypes?.length && formData.equipmentQuality);
      case 4:
        return !!(formData.agreeToTerms && formData.agreeToContentGuidelines);
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
      const applicationData: ContentCreatorApplication = {
        ...formData as ContentCreatorApplication,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/applications/content-creator', {
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age * (Must be 13+)
                </label>
                <input
                  type="number"
                  min="13"
                  max="100"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creator Name/Handle *
              </label>
              <input
                type="text"
                value={formData.creatorName}
                onChange={(e) => handleInputChange('creatorName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your brand name or handle"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform & Content</h2>
              <p className="text-gray-600">Tell us about your social media presence</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Platforms * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.platforms?.includes(platform)}
                      onChange={() => handleArrayToggle('platforms', platform)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{platform}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Platform *
              </label>
              <select
                value={formData.primaryPlatform}
                onChange={(e) => handleInputChange('primaryPlatform', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Select your primary platform"
              >
                <option value="">Select your main platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Follower Counts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Followers</label>
                  <input
                    type="number"
                    value={formData.followerCounts?.instagram || ''}
                    onChange={(e) => handleInputChange('followerCounts.instagram', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Followers</label>
                  <input
                    type="number"
                    value={formData.followerCounts?.tiktok || ''}
                    onChange={(e) => handleInputChange('followerCounts.tiktok', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Subscribers</label>
                  <input
                    type="number"
                    value={formData.followerCounts?.youtube || ''}
                    onChange={(e) => handleInputChange('followerCounts.youtube', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Followers</label>
                  <input
                    type="number"
                    value={formData.followerCounts?.twitter || ''}
                    onChange={(e) => handleInputChange('followerCounts.twitter', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Content Categories * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contentCategories.map((category) => (
                  <label key={category} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.contentCategories?.includes(category)}
                      onChange={() => handleArrayToggle('contentCategories', category)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content & Collaboration</h2>
              <p className="text-gray-600">Tell us about your content creation style</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Style *
              </label>
              <textarea
                value={formData.contentStyle}
                onChange={(e) => handleInputChange('contentStyle', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your content style, aesthetic, and brand voice..."
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
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
                  <option value="multiple-daily">Multiple times daily</option>
                  <option value="3-5-weekly">3-5 times per week</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Engagement Rate *
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.averageEngagementRate}
                    onChange={(e) => handleInputChange('averageEngagementRate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    aria-label="Select average engagement rate"
                  >
                    <option value="">Select range</option>
                    <option value="1-3%">1-3%</option>
                    <option value="3-5%">3-5%</option>
                    <option value="5-8%">5-8%</option>
                    <option value="8-12%">8-12%</option>
                    <option value="12%+">12%+</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Brand Deals
              </label>
              <textarea
                value={formData.previousBrandDeals}
                onChange={(e) => handleInputChange('previousBrandDeals', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List any previous brand collaborations or sponsorships..."
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
                      checked={formData.preferredCollaborationTypes?.includes(type)}
                      onChange={() => handleArrayToggle('preferredCollaborationTypes', type)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Quality *
              </label>
              <div className="relative">
                <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.equipmentQuality}
                  onChange={(e) => handleInputChange('equipmentQuality', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select equipment quality"
                >
                  <option value="">Select equipment level</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="basic-dslr">Basic DSLR/Mirrorless</option>
                  <option value="professional">Professional Equipment</option>
                  <option value="studio-setup">Studio Setup</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate Card/Media Kit URL
              </label>
              <input
                type="url"
                value={formData.rateCard}
                onChange={(e) => handleInputChange('rateCard', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Link to your rate card or media kit"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio & Legal</h2>
              <p className="text-gray-600">Show us your best work and agree to our terms</p>
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
                    placeholder="https://link-to-your-content.com"
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
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Best Performing Content
              </label>
              {(formData.bestPerformingContent || ['']).map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleBestContentChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://link-to-high-performing-content.com"
                  />
                  <button
                    type="button"
                    onClick={() => removeBestContent(index)}
                    className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBestContent}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                + Add Best Content Link
              </button>
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
                  checked={formData.agreeToContentGuidelines}
                  onChange={(e) => handleInputChange('agreeToContentGuidelines', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to follow content guidelines, FTC disclosure requirements, and brand standards *
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
                  Thank you for your interest in becoming a content creator partner! We'll review your application and social profiles within 2-3 business days.
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