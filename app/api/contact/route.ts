import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Save the message to your Supabase Database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: body.name,
        email: body.email,
        message: body.message,
        status: 'new',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    // 2. Send Email Notification to YOU via Resend
    try {
      await resend.emails.send({
        from: 'Clean Logic Website <onboarding@resend.dev>', // Change this later when you add your real domain to Resend
        to: 'cleanlogicsolutions@gmail.com', // MUST CHANGE: Put your actual email address here
        subject: `New Contact Form Message from ${body.name}`,
        html: `
          <h2>New Message Received</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #003366; padding-left: 10px; color: #555;">
            ${body.message}
          </blockquote>
        `,
      });
    } catch (emailError) {
      // If email fails, we log it, but don't break the customer's experience
      console.error('Email failed to send:', emailError);
    }

    // 3. Tell the website to stop loading and show Success
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}