import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const resend = getResend();
    const { error } = await resend.emails.send({
      // onboarding@resend.dev is Resend's shared sandbox sender and in the
      // default configuration only delivers to your own verified address.
      // Set RESEND_FROM to an address on a domain you have verified.
      from: process.env.RESEND_FROM || "Motto Workshop <onboarding@resend.dev>",
      to: email,
      subject: "Motto Workshop: what we cover and how to book",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #12193a;">
          <div style="padding: 32px 20px 24px; border-bottom: 1px solid #ddd9e8;">
            <h1 style="font-size: 1.4rem; font-weight: 600; margin: 0 0 8px;">
              motto<span style="color: #3b5bdb;">workshop</span>
            </h1>
            <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">A session on AI-assisted research</p>
          </div>

          <div style="padding: 24px 20px;">
            <p style="font-size: 0.9rem; line-height: 1.6; margin: 0 0 16px;">
              Hi! Thanks for your interest. Here's what the workshop looks like:
            </p>

            <h2 style="font-size: 1rem; font-weight: 600; margin: 24px 0 8px;">What it is</h2>
            <p style="font-size: 0.85rem; line-height: 1.6; color: #6b7280; margin: 0 0 16px;">
              A two to three hour hands-on workshop where we go through AI-assisted research and analysis
              techniques, step by step. You pick the topic. We work on your actual research question.
            </p>

            <h2 style="font-size: 1rem; font-weight: 600; margin: 24px 0 8px;">What we cover</h2>
            <ul style="font-size: 0.85rem; line-height: 1.8; color: #6b7280; padding-left: 20px; margin: 0 0 16px;">
              <li>Collecting & verifying sources with AI (3-Layer Verification)</li>
              <li>Spotting hallucinations (4 Red Flag patterns)</li>
              <li>Structuring and challenging insights</li>
              <li>Games: Hallucination Hunter, Bad Idea Bingo, Bias Checker</li>
              <li>Turning findings into a shareable trend report</li>
              <li>Generating a shareable report with confidence ratings</li>
            </ul>

            <h2 style="font-size: 1rem; font-weight: 600; margin: 24px 0 8px;">What you keep</h2>
            <ul style="font-size: 0.85rem; line-height: 1.8; color: #6b7280; padding-left: 20px; margin: 0 0 16px;">
              <li>Your research output, structured and actionable</li>
              <li>Reusable prompts, workflows, and templates</li>
              <li>Verification checklists and red flag cards</li>
              <li>A process you can modify and repeat</li>
            </ul>

            <h2 style="font-size: 1rem; font-weight: 600; margin: 24px 0 8px;">Format</h2>
            <p style="font-size: 0.85rem; line-height: 1.6; color: #6b7280; margin: 0 0 24px;">
              Online, two to three hours, individual or team, max 12. Tools: Claude, NotebookLM, Motto Workshop Games.
            </p>

            <div style="text-align: center; padding: 20px 0;">
              <a href="https://calendar.app.google/K83wsdYJEWv5mWh47" style="display: inline-block; background: #3b5bdb; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.85rem;">
                Book a Call
              </a>
            </div>

            <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; margin: 16px 0 0;">
              Or reply to this email with any questions.
            </p>
          </div>

          <div style="padding: 20px; font-size: 0.72rem; color: #9ca3af; border-top: 1px solid #ddd9e8; text-align: center;">
            Motto Workshop · Pelinsu Pelit · pelinsu@mottoworkshop.com
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Notify the owner. Without this the lead exists only in a server log
    // that nobody reads, which is where every previous signup went.
    const notifyTo = process.env.LEAD_NOTIFY_EMAIL || "pelinsupelit@gmail.com";
    const { error: notifyError } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Motto Workshop <onboarding@resend.dev>",
      to: notifyTo,
      subject: `New lead: ${email}`,
      html: `
        <p><strong>${email}</strong> requested the workshop details.</p>
        <p>Captured ${new Date().toISOString()}</p>
      `,
    });

    if (notifyError) {
      // The visitor already got their email. Do not fail their request because
      // the internal notification bounced, but make it loud in the logs.
      console.error("Lead notification failed:", notifyError, email);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Email capture error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
