import nodemailer from 'nodemailer';

/** Send the password-reset link to the registered user through the configured Gmail account. */
export const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) throw new Error('Email is not configured. Add SMTP_USER and SMTP_PASS to backend/.env.');
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
  await transporter.sendMail({
    from: `WealthWise <${process.env.SMTP_USER}>`,
    to,
    subject: 'Reset your WealthWise password',
    text: `Hello ${name},\n\nUse this link to reset your WealthWise password. It expires in 15 minutes:\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>Hello ${name},</p><p>Use the button below to reset your WealthWise password. This link expires in 15 minutes.</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#2563eb;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600">Reset password</a></p><p>If the button does not work, copy this link into your browser:</p><p>${resetUrl}</p><p>If you did not request this, you can ignore this email.</p>`,
  });
};
