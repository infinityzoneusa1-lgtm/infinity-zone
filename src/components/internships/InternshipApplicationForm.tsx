'use client';

import { useState } from 'react';
import { InternshipApplication } from '@/types/applications';
import { Mail, Phone, MapPin, GraduationCap, FileText, User, Check, AlertCircle } from 'lucide-react';

export default function InternshipApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Partial<InternshipApplication>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    currentEducationLevel: 'undergraduate',
    schoolName: '',
    major: '',
    expectedGraduation: '',
    gpa: 0,
    preferredDepartments: [],
    internshipType: 'paid',
    availableStartDate: '',
    duration: '',
    hoursPerWeek: '',
    relevantExperience: '',
    skills: [],
    languages: [],
    resume: '',
    coverLetter: '',
    portfolioUrl: '',
    references: [],
    agreeToTerms: false,
    agreeToBackground: false
  });

  const departments = [
    'Marketing & Social Media',
    'Content Creation',
    'Web Development',
    'Graphic Design',
    'Customer Service',
    'Data Analysis',
    'Human Resources',
    'Finance & Accounting',
    'Product Management',
    'Sales & Business Development'
  ];

  const skillsList = [
    'Adobe Creative Suite',
    'Social Media Management',
    'Content Writing',
    'Photography',
    'Video Editing',
    'Web Development',
    'Data Analysis',
    'Customer Service',
    'Project Management',
    'Microsoft Office',
    'Google Analytics',
    'SEO/SEM',
    'E-commerce',
    'Graphic Design'
  ];

  const languagesList = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof InternshipApplication] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: field === 'gpa' ? Number(value) || 0 : value
      }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const current = (formData[field as keyof InternshipApplication] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    handleInputChange(field, updated);
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const current = [...(formData.references || [])];
    if (!current[index]) {
      current[index] = { name: '', relationship: '', email: '', phone: '' };
    }
    current[index] = { ...current[index], [field]: value };
    handleInputChange('references', current);
  };

  const addReference = () => {
    const current = [...(formData.references || [])];
    current.push({ name: '', relationship: '', email: '', phone: '' });
    handleInputChange('references', current);
  };

  const removeReference = (index: number) => {
    const current = [...(formData.references || [])];
    current.splice(index, 1);
    handleInputChange('references', current);
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && 
                 formData.dateOfBirth && formData.address?.street && formData.address?.city && 
                 formData.address?.state);
      case 2:
        return !!(formData.currentEducationLevel && formData.schoolName && formData.expectedGraduation);
      case 3:
        return !!(formData.preferredDepartments?.length && formData.internshipType && 
                 formData.availableStartDate && formData.duration && formData.hoursPerWeek);
      case 4:
        return !!(formData.relevantExperience && formData.coverLetter && formData.agreeToTerms && 
                 formData.agreeToBackground);
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
      const applicationData: InternshipApplication = {
        ...formData as InternshipApplication,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/applications/internship', {
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
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  title="Select your date of birth"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address?.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Street Address"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={formData.address?.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={formData.address?.state}
                    onChange={(e) => handleInputChange('address.state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    value={formData.address?.zipCode}
                    onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Education Information</h2>
              <p className="text-gray-600">Tell us about your educational background</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Education Level *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.currentEducationLevel}
                    onChange={(e) => handleInputChange('currentEducationLevel', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    aria-label="Select current education level"
                  >
                    <option value="high_school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School/University Name *
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your school or university"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major/Field of Study
                </label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your major or field of study"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Graduation *
                </label>
                <input
                  type="text"
                  value={formData.expectedGraduation}
                  onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., May 2025"
                  title="Enter your expected graduation date"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.gpa || ''}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 3.75"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Internship Preferences</h2>
              <p className="text-gray-600">Tell us about your internship goals</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Preferred Departments * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {departments.map((department) => (
                  <label key={department} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredDepartments?.includes(department)}
                      onChange={() => handleArrayToggle('preferredDepartments', department)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{department}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Type *
                </label>
                <select
                  value={formData.internshipType}
                  onChange={(e) => handleInputChange('internshipType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select internship type"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="for_credit">For Academic Credit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Start Date *
                </label>
                <input
                  type="date"
                  value={formData.availableStartDate}
                  onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  title="Select your available start date"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select internship duration"
                >
                  <option value="">Select duration</option>
                  <option value="3-months">3 months</option>
                  <option value="6-months">6 months</option>
                  <option value="12-months">12 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Per Week *
                </label>
                <select
                  value={formData.hoursPerWeek}
                  onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  aria-label="Select hours per week"
                >
                  <option value="">Select hours</option>
                  <option value="10-15">10-15 hours</option>
                  <option value="15-20">15-20 hours</option>
                  <option value="20-30">20-30 hours</option>
                  <option value="30-40">30-40 hours</option>
                  <option value="40+">40+ hours</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience & Documents</h2>
              <p className="text-gray-600">Share your experience and required documents</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Experience *
              </label>
              <textarea
                value={formData.relevantExperience}
                onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe any relevant work experience, projects, or activities..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Skills (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skillsList.map((skill) => (
                  <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills?.includes(skill)}
                      onChange={() => handleArrayToggle('skills', skill)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Languages (Select all that apply)
              </label>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {languagesList.map((language) => (
                  <label key={language} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.languages?.includes(language)}
                      onChange={() => handleArrayToggle('languages', language)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Write a compelling cover letter explaining why you want to intern with us..."
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume URL
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.resume}
                    onChange={(e) => handleInputChange('resume', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Link to your resume"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Link to your portfolio or work samples"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                References (Optional)
              </label>
              {(formData.references || []).map((ref, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Reference Name"
                    />
                    <input
                      type="text"
                      value={ref.relationship}
                      onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Relationship (e.g., Professor, Manager)"
                    />
                    <input
                      type="email"
                      value={ref.email}
                      onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Email Address"
                    />
                    <input
                      type="tel"
                      value={ref.phone}
                      onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Phone Number"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove Reference
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addReference}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                + Add Reference
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
                  checked={formData.agreeToBackground}
                  onChange={(e) => handleInputChange('agreeToBackground', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I consent to background checks and reference verification as required *
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
                  Thank you for your interest in our internship program! We'll review your application and get back to you within 1-2 weeks.
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
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-purple-600 h-2 rounded-full transition-all duration-300 ${
                  step === 1 ? 'w-1/4' : step === 2 ? 'w-2/4' : step === 3 ? 'w-3/4' : 'w-full'
                }`}
                role="progressbar"
                aria-label={`Application progress: Step ${step} of 4`}
              >
                <span className="sr-only">{Math.round((step / 4) * 100)}% complete</span>
              </div>
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