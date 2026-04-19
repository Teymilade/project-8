import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Save the booking to your Supabase Database
    const { error: dbError } = await supabase
      .from('domestic_bookings')
      .insert({
        customer_name: body.name,
        customer_email: body.email,
        customer_phone: body.phone,
        address: body.address,
        postcode: body.postcode,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        frequency: body.frequency,
        total_price: body.price,
        status: 'pending',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    // 2. Send Email Notification to YOU via Resend
    try {
      await resend.emails.send({
        from: 'Clean Logic Bookings <onboarding@resend.dev>', // Change to your verified domain later
        to: 'your-personal-email@gmail.com', // MUST CHANGE: Put your actual email address here
        subject: `New Booking Request: ${body.name}`,
        html: `
          <h2>New Domestic Cleaning Booking</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Address:</strong> ${body.address}, ${body.postcode}</p>
          <p><strong>Details:</strong> ${body.bedrooms} Bedrooms, ${body.bathrooms} Bathrooms (${body.frequency})</p>
          <p><strong>Quoted Price:</strong> £${body.price}</p>
          <br/>
          <p>Log in to your Admin Portal to assign a cleaner to this job.</p>
        `,
      });
    } catch (emailError) {
      console.error('Email failed to send:', emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}