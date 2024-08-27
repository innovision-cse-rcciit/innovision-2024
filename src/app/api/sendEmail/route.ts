import { sendMail } from '@/utils/functions/sendMail';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  const { name, email, collegeRoll, department, section, phoneNumber, gender } = await request.json();

  const { data, error } = await supabase
    .from('registrations')
    .insert([{ name, email, collegeRoll, department, section, phoneNumber, gender }]);

  if (error) {
    console.error('Error saving to Supabase:', error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const emailContent = {
    to: email,
    subject: 'Innovision 2024 Registration Confirmation',
    text: `Dear ${name},\n\nThank you for registering for Innovision 2024! We're excited to have you participate.\n\nBest regards,\nInnovision 2024 Team`,
    html: `<p>Dear ${name},</p><p>Thank you for registering for Innovision 2024! We're excited to have you participate.</p><p>Best regards,<br>Innovision 2024 Team</p>`,
  };
  const emailResponse = await sendMail(emailContent);

  if (!emailResponse.success) {
    return new Response(JSON.stringify({ success: false, error: emailResponse.error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
