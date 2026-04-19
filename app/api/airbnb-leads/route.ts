import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
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
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating airbnb lead:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in airbnb-leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
