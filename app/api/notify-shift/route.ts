import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { shiftDetails, staffEmail, staffName } = await request.json();

    await resend.emails.send({
      from: 'Clean Logic Admin <onboarding@resend.dev>', // Change to your verified domain later
      to: staffEmail, // This will send to the cleaner's email address
      subject: `New Shift Assigned: ${shiftDetails.shift_date}`,
      html: `
        <h2>Hello ${staffName},</h2>
        <p>You have been assigned a new cleaning shift. Please review the details below:</p>
        
        <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${shiftDetails.shift_date}</p>
          <p><strong>Time:</strong> ${shiftDetails.scheduled_start} to ${shiftDetails.scheduled_end}</p>
          <p><strong>Location:</strong> ${shiftDetails.location}</p>
          ${shiftDetails.notes ? `<p><strong>Notes:</strong> ${shiftDetails.notes}</p>` : ''}
        </div>

        <p>Please log in to the <a href="https://yourwebsite.com/cleaner-login">Cleaner Portal</a> to view your full schedule.</p>
        <br/>
        <p>Thanks,<br/>Clean Logic Management</p>
      `,
    });

    return NextResponse.json({ message: 'Notification sent' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}