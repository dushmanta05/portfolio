export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

import { validateEmailData } from '@utils/validation';
import { createEmailTemplate } from 'src/email/template';

const {
  RESEND_API_KEY: resendKey,
  RESEND_FROM_EMAIL: fromEmail,
  RECIPIENT_MAIL: recipientMail,
} = import.meta.env;

const resend = new Resend(resendKey);

interface EmailData {
  fullName: string;
  email: string;
  subject: string;
  description: string;
}

export const POST: APIRoute = async ({ request, url }) => {
  const allowedOrigin = import.meta.env.DEV ? '*' : url.origin;
  const createResponse = (
    success: boolean,
    message: string,
    status: number = success ? 200 : 500
  ) => {
    return new Response(JSON.stringify({ success, message }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  };
  if (!resendKey || !fromEmail || !recipientMail) {
    return createResponse(false, 'Service temporarily unavailable. Please try again later.', 503);
  }

  if (import.meta.env.DEV) {
    return createResponse(true, `Thank you for reaching out! I’ll respond to your message shortly.`);
  }

  try {
    let emailData: EmailData;
    try {
        emailData = await request.json() as EmailData;
    } catch {
      return createResponse(false, 'Invalid request format.', 400);
    }

    if (!validateEmailData(emailData)) {
      return createResponse(false, 'Please check if all fields are filled correctly.', 400);
    }

    const { fullName, email, subject, description } = emailData as EmailData;
    const emailSubject = `Portfolio Contact: ${email}`;
    const htmlTemplate = createEmailTemplate({ fullName, email, subject, description });

    try {
      const { error } = await resend.emails.send({
        from: `Portfolio <${fromEmail}>`,
        to: [recipientMail],
        subject: emailSubject,
        html: htmlTemplate,
      });

      if (error) {
        console.error('Resend API error:', error);
        return createResponse(false, 'Failed to send message. Please try again later.');
      }

      return createResponse(true, `Thank you for reaching out! I’ll respond to your message shortly.`);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return createResponse(false, 'Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return createResponse(false, 'An unexpected error occurred. Please try again later.');
  }
};

export const OPTIONS: APIRoute = async ({ url }) => {
  const allowedOrigin = import.meta.env.DEV ? '*' : url.origin;

  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
