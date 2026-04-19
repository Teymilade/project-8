import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase with the SERVICE ROLE KEY (Master Key) to bypass Auth restrictions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, role, password } = body;

    // 1. Create the user in Supabase Authentication
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm so they don't have to click a link
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user in Auth');
    }

    // 2. Create their entry in the staff_profiles table
    const { error: profileError } = await supabaseAdmin
      .from('staff_profiles')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        role: role,
        phone: phone,
        is_active: true
      });

    if (profileError) {
      // If profile creation fails, we should ideally clean up the auth user, but for now we throw error
      throw new Error(profileError.message);
    }

    // 3. Send them a Welcome Email with their credentials
    try {
      await resend.emails.send({
        from: 'Clean Logic Management <onboarding@resend.dev>', // Change when you verify your domain
        to: email, 
        subject: 'Welcome to the Clean Logic Team!',
        html: `
          <h2>Welcome ${fullName}!</h2>
          <p>Your staff account has been successfully created.</p>
          <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Login Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
          </div>
          <p>Please log in to the <a href="https://yourwebsite.com/cleaner-login">Staff Portal</a> to view your upcoming shifts.</p>
        `
      });
    } catch (emailErr) {
      console.error("Welcome email failed to send (likely due to Resend Sandbox rules):", emailErr);
    }

    return NextResponse.json({ success: true, message: 'Staff created successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating staff:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}