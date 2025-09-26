import { NextRequest, NextResponse } from 'next/server';
import { ContentCreatorApplication } from '@/types/applications';

export async function POST(request: NextRequest) {
  try {
    const applicationData: ContentCreatorApplication = await request.json();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'location',
      'age',
      'creatorName',
      'platforms',
      'primaryPlatform',
      'contentCategories',
      'contentStyle',
      'postingFrequency',
      'averageEngagementRate',
      'preferredCollaborationTypes',
      'equipmentQuality',
      'agreeToTerms',
      'agreeToContentGuidelines'
    ];

    for (const field of requiredFields) {
      if (!applicationData[field as keyof ContentCreatorApplication]) {
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

    // Validate age requirement
    if (applicationData.age < 13) {
      return NextResponse.json(
        { error: 'Must be at least 13 years old to apply', success: false },
        { status: 400 }
      );
    }

    // Validate arrays are not empty
    if (!applicationData.platforms?.length) {
      return NextResponse.json(
        { error: 'At least one platform must be selected', success: false },
        { status: 400 }
      );
    }

    if (!applicationData.contentCategories?.length) {
      return NextResponse.json(
        { error: 'At least one content category must be selected', success: false },
        { status: 400 }
      );
    }

    if (!applicationData.preferredCollaborationTypes?.length) {
      return NextResponse.json(
        { error: 'At least one collaboration type must be selected', success: false },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `CC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Complete application data
    const completeApplication: ContentCreatorApplication = {
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
    console.log('Content Creator Application Received:', {
      id: applicationId,
      email: applicationData.email,
      creatorName: applicationData.creatorName,
      primaryPlatform: applicationData.primaryPlatform,
      platforms: applicationData.platforms,
      contentCategories: applicationData.contentCategories,
      submittedAt: completeApplication.submittedAt,
    });

    // Send confirmation email (simulate)
    await sendContentCreatorConfirmationEmail(completeApplication);

    // Notify admin team (simulate)
    await notifyAdminTeam('content-creator', completeApplication);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: applicationId,
    });

  } catch (error) {
    console.error('Content Creator application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

// Simulate sending confirmation email
async function sendContentCreatorConfirmationEmail(application: ContentCreatorApplication) {
  console.log(`Sending confirmation email to ${application.email}`);
  
  const emailContent = `
    Dear ${application.firstName} ${application.lastName},

    Thank you for your interest in joining our content creator program!

    We have received your application (ID: ${application.id}) and our creator relations team will review it within 2-3 business days.

    Application Details:
    - Creator Name: ${application.creatorName}
    - Primary Platform: ${application.primaryPlatform}
    - Platforms: ${application.platforms?.join(', ')}
    - Content Categories: ${application.contentCategories?.join(', ')}
    - Average Engagement Rate: ${application.averageEngagementRate}
    - Equipment Quality: ${application.equipmentQuality}
    - Submitted: ${new Date(application.submittedAt).toLocaleDateString()}

    What's Next:
    1. Our creator relations team will review your application and social profiles
    2. We'll evaluate your content quality, engagement rates, and brand alignment
    3. You'll receive approval/rejection notification via email
    4. If approved, you'll get access to:
       - Exclusive product collaborations
       - Early access to new launches
       - Custom discount codes for your audience
       - Performance-based bonuses
       - Creator dashboard with analytics

    Content Creator Benefits:
    - Product gifting for authentic reviews
    - Monetary compensation based on performance
    - Long-term partnership opportunities
    - Cross-platform collaboration support
    - Access to exclusive creator events

    Collaboration Guidelines:
    - Authentic content that aligns with your brand
    - FTC compliance for sponsored content
    - High-quality visuals and engaging captions
    - Consistent posting schedule
    - Professional communication and reliability

    Performance Metrics:
    - Engagement rates and audience interaction
    - Click-through rates on promotional content
    - Conversion rates and sales attribution
    - Content quality and brand alignment
    - Follower growth and audience demographics

    If you have any questions, please contact our creator relations team at creators@infinityzone.com

    We're excited about the possibility of collaborating with you!

    Best regards,
    The Infinity Zone Creator Relations Team
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