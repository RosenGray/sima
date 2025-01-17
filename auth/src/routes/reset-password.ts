import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

// Create a function to get the transporter instead of creating it at module level
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

interface EmailResponse {
  success: boolean;
  error?: string;
}

export const emailService = {
  async sendVerificationEmail(
    to: string,
    token: string
  ): Promise<EmailResponse> {
    try {
      const transporter = getTransporter(); // Get transporter when needed
      await transporter.sendMail({
        from: process.env.GMAIL_APP_USER,
        to,
        subject: "Verify your email",
        html: `
          <h1>Verify your email</h1>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify/${token}">Click here to verify</a>
        `,
      });
      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};

router.post("/api/users/reset-password", async (req, res) => {
  const { email } = req.body;
  // This works because route handlers execute after env vars are loaded
  try {
    const result = await emailService.sendVerificationEmail(email, 'some-token')
    if (!result.success) {
      return res.status(500).json({ message: result.error })
    }
    res.status(200).json({ message: 'Verification email sent' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' })
  }

});

export default router;