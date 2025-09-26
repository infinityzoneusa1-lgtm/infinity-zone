import { NextRequest, NextResponse } from 'next/server';
import { InternshipApplication } from '@/types/applications';

// Simulated email function (replace with actual email service)
async function sendEmail(to: string, subject: string, html: string) {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${html}`);
  // In production, use services like SendGrid, Mailgun, or AWS SES
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const applicationData: InternshipApplication = await request.json();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'currentEducationLevel',
      'schoolName',
      'expectedGraduation',
      'preferredDepartments',
      'internshipType',
      'availableStartDate',
      'duration',
      'hoursPerWeek',
      'relevantExperience',
      'coverLetter',
      'agreeToTerms',
      'agreeToBackground'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = applicationData[field as keyof InternshipApplication];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate address if provided
    if (applicationData.address) {
      const requiredAddressFields = ['street', 'city', 'state'];
      const missingAddressFields = requiredAddressFields.filter(field => 
        !applicationData.address![field as keyof typeof applicationData.address]
      );
      
      if (missingAddressFields.length > 0) {
        return NextResponse.json(
          { error: 'Incomplete address information', fields: missingAddressFields },
          { status: 400 }
        );
      }
    }

    // In a real application, save to database
    console.log('Internship Application Received:', {
      name: `${applicationData.firstName} ${applicationData.lastName}`,
      email: applicationData.email,
      phone: applicationData.phone,
      school: applicationData.schoolName,
      departments: applicationData.preferredDepartments,
      internshipType: applicationData.internshipType,
      availableStart: applicationData.availableStartDate,
      submittedAt: applicationData.submittedAt
    });

    // Send confirmation email to applicant
    const applicantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #450209;">Internship Application Received</h2>
        <p>Dear ${applicationData.firstName},</p>
        <p>Thank you for applying for an internship with InfinityZone! We have successfully received your application.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Summary:</h3>
          <ul>
            <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
            <li><strong>Email:</strong> ${applicationData.email}</li>
            <li><strong>Phone:</strong> ${applicationData.phone}</li>
            <li><strong>School:</strong> ${applicationData.schoolName}</li>
            <li><strong>Education Level:</strong> ${applicationData.currentEducationLevel}</li>
            <li><strong>Preferred Departments:</strong> ${applicationData.preferredDepartments?.join(', ')}</li>
            <li><strong>Internship Type:</strong> ${applicationData.internshipType}</li>
            <li><strong>Available Start Date:</strong> ${applicationData.availableStartDate}</li>
            <li><strong>Duration:</strong> ${applicationData.duration}</li>
            <li><strong>Hours per Week:</strong> ${applicationData.hoursPerWeek}</li>
            <li><strong>Expected Graduation:</strong> ${applicationData.expectedGraduation}</li>
            ${applicationData.major ? `<li><strong>Major:</strong> ${applicationData.major}</li>` : ''}
            ${applicationData.gpa ? `<li><strong>GPA:</strong> ${applicationData.gpa}</li>` : ''}
          </ul>
        </div>

        <h3>What's Next?</h3>
        <p>Our team will review your application and get back to you within 1-2 weeks. We'll contact you if we need any additional information or to schedule an interview.</p>
        
        <p>If you have any questions in the meantime, please don't hesitate to contact us at internships@infinityzone.com</p>
        
        <p>Best regards,<br>
        The InfinityZone HR Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation email. Please do not reply to this email.
        </p>
      </div>
    `;

    await sendEmail(
      applicationData.email,
      'Internship Application Received - InfinityZone',
      applicantEmailHtml
    );

    // Send notification email to admin/HR
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #450209;">New Internship Application Received</h2>
        <p>A new internship application has been submitted.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Applicant Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
            <li><strong>Email:</strong> ${applicationData.email}</li>
            <li><strong>Phone:</strong> ${applicationData.phone}</li>
            <li><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</li>
            <li><strong>School:</strong> ${applicationData.schoolName}</li>
            <li><strong>Education Level:</strong> ${applicationData.currentEducationLevel}</li>
            <li><strong>Expected Graduation:</strong> ${applicationData.expectedGraduation}</li>
            ${applicationData.major ? `<li><strong>Major:</strong> ${applicationData.major}</li>` : ''}
            ${applicationData.gpa ? `<li><strong>GPA:</strong> ${applicationData.gpa}</li>` : ''}
            <li><strong>Preferred Departments:</strong> ${applicationData.preferredDepartments?.join(', ')}</li>
            <li><strong>Internship Type:</strong> ${applicationData.internshipType}</li>
            <li><strong>Available Start Date:</strong> ${applicationData.availableStartDate}</li>
            <li><strong>Duration:</strong> ${applicationData.duration}</li>
            <li><strong>Hours per Week:</strong> ${applicationData.hoursPerWeek}</li>
            ${applicationData.skills?.length ? `<li><strong>Skills:</strong> ${applicationData.skills.join(', ')}</li>` : ''}
            ${applicationData.languages?.length ? `<li><strong>Languages:</strong> ${applicationData.languages.join(', ')}</li>` : ''}
          </ul>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>Relevant Experience:</h4>
          <p style="white-space: pre-wrap;">${applicationData.relevantExperience}</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>Cover Letter:</h4>
          <p style="white-space: pre-wrap;">${applicationData.coverLetter}</p>
        </div>

        ${applicationData.address ? `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>Address:</h4>
          <p>${applicationData.address.street}<br>
          ${applicationData.address.city}, ${applicationData.address.state} ${applicationData.address.zipCode}<br>
          ${applicationData.address.country}</p>
        </div>
        ` : ''}

        ${applicationData.resume ? `<p><strong>Resume:</strong> <a href="${applicationData.resume}">${applicationData.resume}</a></p>` : ''}
        ${applicationData.portfolioUrl ? `<p><strong>Portfolio:</strong> <a href="${applicationData.portfolioUrl}">${applicationData.portfolioUrl}</a></p>` : ''}

        ${applicationData.references?.length ? `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>References:</h4>
          ${applicationData.references.map((ref, index) => `
            <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #ddd;">
              <p><strong>Reference ${index + 1}:</strong></p>
              <p><strong>Name:</strong> ${ref.name}</p>
              <p><strong>Relationship:</strong> ${ref.relationship}</p>
              <p><strong>Email:</strong> ${ref.email}</p>
              <p><strong>Phone:</strong> ${ref.phone}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        <p><strong>Submitted:</strong> ${new Date(applicationData.submittedAt).toLocaleString()}</p>
      </div>
    `;

    await sendEmail(
      'internships@infinityzone.com',
      `New Internship Application - ${applicationData.firstName} ${applicationData.lastName}`,
      adminEmailHtml
    );

    return NextResponse.json({
      success: true,
      message: 'Internship application submitted successfully',
      applicationId: `INT-${Date.now()}` // In production, use proper ID generation
    });

  } catch (error) {
    console.error('Error processing internship application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}