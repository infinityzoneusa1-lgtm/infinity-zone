import { NextRequest, NextResponse } from 'next/server';
import { BloggerApplication } from '@/types/applications';

export async function POST(request: NextRequest) {
  try {
    const applicationData: BloggerApplication = await request.json();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'location',
      'blogName',
      'blogUrl',
      'blogNiche',
      'monthlyPageViews',
      'postingFrequency',
      'contentTypes',
      'writingStyle',
      'collaborationTypes',
      'availabilityTimeline',
      'agreeToTerms',
      'agreeToGuidelines'
    ];

    for (const field of requiredFields) {
      if (!applicationData[field as keyof BloggerApplication]) {
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

    // Validate URL format
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(applicationData.blogUrl)) {
      return NextResponse.json(
        { error: 'Invalid blog URL format', success: false },
        { status: 400 }
      );
    }

    // Validate arrays are not empty
    if (!applicationData.blogNiche?.length) {
      return NextResponse.json(
        { error: 'At least one blog niche must be selected', success: false },
        { status: 400 }
      );
    }

    if (!applicationData.contentTypes?.length) {
      return NextResponse.json(
        { error: 'At least one content type must be selected', success: false },
        { status: 400 }
      );
    }

    if (!applicationData.collaborationTypes?.length) {
      return NextResponse.json(
        { error: 'At least one collaboration type must be selected', success: false },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `BLG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Complete application data
    const completeApplication: BloggerApplication = {
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
    console.log('Blogger Application Received:', {
      id: applicationId,
      email: applicationData.email,
      blogName: applicationData.blogName,
      blogUrl: applicationData.blogUrl,
      blogNiche: applicationData.blogNiche,
      monthlyPageViews: applicationData.monthlyPageViews,
      submittedAt: completeApplication.submittedAt,
    });

    // Send confirmation email (simulate)
    await sendBloggerConfirmationEmail(completeApplication);

    // Notify admin team (simulate)
    await notifyAdminTeam('blogger', completeApplication);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: applicationId,
    });

  } catch (error) {
    console.error('Blogger application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

// Simulate sending confirmation email
async function sendBloggerConfirmationEmail(application: BloggerApplication) {
  console.log(`Sending confirmation email to ${application.email}`);
  
  const emailContent = `
    Dear ${application.firstName} ${application.lastName},

    Thank you for your interest in collaborating with Infinity Zone as a blogger!

    We have received your application (ID: ${application.id}) and our content team will review it within 1-2 business days.

    Application Details:
    - Blog Name: ${application.blogName}
    - Blog URL: ${application.blogUrl}
    - Blog Niche: ${application.blogNiche?.join(', ')}
    - Monthly Page Views: ${application.monthlyPageViews}
    - Content Types: ${application.contentTypes?.join(', ')}
    - Posting Frequency: ${application.postingFrequency}
    - Submitted: ${new Date(application.submittedAt).toLocaleDateString()}

    What's Next:
    1. Our content team will review your blog and social media presence
    2. We'll evaluate your content quality, engagement, and brand alignment
    3. You'll receive approval/rejection notification via email
    4. If approved, you'll get access to:
       - Product samples for review
       - Exclusive discount codes for your audience
       - Priority access to new launches
       - Collaboration opportunities and campaigns

    Collaboration Guidelines:
    - FTC disclosure compliance required
    - Honest and authentic product reviews
    - High-quality photos and content
    - Timely delivery of agreed content
    - Brand alignment with our values

    Potential Collaboration Types:
    - Sponsored blog posts
    - Product reviews and unboxings
    - Social media campaigns
    - Giveaways and contests
    - Long-term ambassador programs
    - Event coverage and launches

    Rate Structure:
    - Compensation varies based on reach, engagement, and content type
    - Product gifting + monetary compensation for qualified bloggers
    - Performance bonuses for high-converting content
    - Exclusive blogger perks and early access

    If you have any questions, please contact our blogger relations team at bloggers@infinityzone.com

    We're excited about the possibility of working together!

    Best regards,
    The Infinity Zone Content Team
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