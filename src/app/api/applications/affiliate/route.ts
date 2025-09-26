import { NextRequest, NextResponse } from 'next/server';
import { AffiliateApplication } from '@/types/applications';

export async function POST(request: NextRequest) {
  try {
    const applicationData: AffiliateApplication = await request.json();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'marketingChannels',
      'audienceSize',
      'audienceDemographics',
      'promotionStrategy',
      'contentTypes',
      'expectedMonthlyPromotions',
      'agreeToTerms',
      'agreeToCommissionStructure',
      'preferredPaymentMethod',
      'paymentDetails'
    ];

    for (const field of requiredFields) {
      if (!applicationData[field as keyof AffiliateApplication]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}`, success: false },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format', success: false },
        { status: 400 }
      );
    }

    // Validate arrays are not empty
    if (!applicationData.marketingChannels?.length) {
      return NextResponse.json(
        { error: 'At least one marketing channel must be selected', success: false },
        { status: 400 }
      );
    }

    if (!applicationData.contentTypes?.length) {
      return NextResponse.json(
        { error: 'At least one content type must be selected', success: false },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `AFF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Complete application data
    const completeApplication: AffiliateApplication = {
      ...applicationData,
      id: applicationId,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin team
    
    // Simulate database save
    console.log('Affiliate Application Received:', {
      id: applicationId,
      email: applicationData.email,
      audienceSize: applicationData.audienceSize,
      marketingChannels: applicationData.marketingChannels,
      submittedAt: completeApplication.submittedAt,
    });

    // Send confirmation email (simulate)
    await sendAffiliateConfirmationEmail(completeApplication);

    // Notify admin team (simulate)
    await notifyAdminTeam('affiliate', completeApplication);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: applicationId,
    });

  } catch (error) {
    console.error('Affiliate application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

// Simulate sending confirmation email
async function sendAffiliateConfirmationEmail(application: AffiliateApplication) {
  console.log(`Sending confirmation email to ${application.email}`);
  
  const emailContent = `
    Dear ${application.firstName} ${application.lastName},

    Thank you for your interest in joining our affiliate program!

    We have received your application (ID: ${application.id}) and our team will review it within 2-3 business days.

    Application Details:
    - Marketing Channels: ${application.marketingChannels?.join(', ')}
    - Audience Size: ${application.audienceSize}
    - Content Types: ${application.contentTypes?.join(', ')}
    - Expected Monthly Promotions: ${application.expectedMonthlyPromotions}
    - Submitted: ${new Date(application.submittedAt).toLocaleDateString()}

    What's Next:
    1. Our affiliate team will review your application and social profiles
    2. We may contact you for additional information or verification
    3. You'll receive approval/rejection notification via email
    4. If approved, you'll get access to your affiliate dashboard with:
       - Unique referral links
       - Marketing materials
       - Real-time tracking
       - Commission reports

    Commission Structure:
    - 10% commission on all referred sales
    - Monthly payments (minimum $50 threshold)
    - 30-day cookie duration
    - Performance bonuses for top affiliates

    Social Media Requirements:
    - Authentic engagement with your audience
    - Compliance with FTC disclosure guidelines
    - Quality content that aligns with our brand values

    If you have any questions, please contact our affiliate support team at affiliates@infinityzone.com

    Best regards,
    The Infinity Zone Affiliate Team
  `;

  // In production, actually send the email here
  return Promise.resolve();
}

// Simulate notifying admin team
async function notifyAdminTeam(type: string, application: any) {
  console.log(`New ${type} application received:`, {
    id: application.id,
    name: `${application.firstName} ${application.lastName}`,
    email: application.email,
    submittedAt: application.submittedAt,
  });

  return Promise.resolve();
}