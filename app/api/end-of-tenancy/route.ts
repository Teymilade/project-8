import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Send Email Notification to the Admin
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Change this to your domain later e.g., 'bookings@cleanlogic.com'
      to: 'cleanlogicsolutions@gmail.com', // PUT YOUR ACTUAL EMAIL HERE
      subject: `New End of Tenancy Quote Request: ${body.customerName}`,
      html: `
        <h2>New Quote Request Received</h2>
        <p><strong>Name:</strong> ${body.customerName}</p>
        <p><strong>Email:</strong> ${body.customerEmail}</p>
        <p><strong>Phone:</strong> ${body.customerPhone}</p>
        <p><strong>Property:</strong> ${body.propertyAddress}, ${body.postcode}</p>
        <p><strong>Type:</strong> ${body.propertyType}</p>
        <p><strong>Move Out Date:</strong> ${body.moveOutDate}</p>
        <p><strong>Photos Uploaded:</strong> ${body.photoCount}</p>
        <br/>
        <h3>Uploaded Photo Links:</h3>
        <ul>
          ${body.photoUrls ? body.photoUrls.map((url: string) => `<li><a href="${url}">View Photo</a></li>`).join('') : 'No photos provided'}
        </ul>
      `,
    });

    // 2. Return success to the frontend
    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing end of tenancy request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}