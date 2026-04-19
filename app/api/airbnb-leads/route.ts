import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Save the lead to your Supabase Database (Removed .select() to fix the RLS security error)
    const { error: dbError } = await supabase
      .from('airbnb_leads')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        property_address: body.propertyAddress,
        postcode: body.postcode,
        property_type: body.propertyType,
        linen_service: body.linenService === 'yes',
        turnaround_frequency: body.turnaroundFrequency,
        status: 'new',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    // 2. Send Email Notification to the Admin via Resend
    try {
      await resend.emails.send({
        from: 'Clean Logic Airbnb <onboarding@resend.dev>', // Change to verified domain later
        to: 'cleanlogicsolutions@gmail.com', // MUST CHANGE: Put your actual email address here
        subject: `New Airbnb Vetting Application: ${body.name}`,
        html: `
          <h2>New Airbnb Host Application</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Property:</strong> ${body.propertyAddress}, ${body.postcode}</p>
          <p><strong>Property Type:</strong> ${body.propertyType}</p>
          <p><strong>Linen Service Needed:</strong> ${body.linenService === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>Expected Frequency:</strong> ${body.turnaroundFrequency}</p>
          <br/>
          <p>Please review this property and contact the host to provide a quote.</p>
        `,
      });
    } catch (emailError) {
      // If email fails (e.g., Sandbox restrictions), log it but don't break the user's form submission
      console.error('Email failed to send:', emailError);
    }

    // 3. Return success to the frontend
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}