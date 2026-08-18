import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendSupportEmail(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const supportEmail = process.env.SUPPORT_EMAIL;

    await transporter.sendMail({
      from: `"WTech Store Support" <${process.env.SMTP_USER}>`,
      to: supportEmail,
      replyTo: email,
      subject: `[WTech Support] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f2ff; border-bottom: 2px solid #00f2ff; padding-bottom: 10px;">
            New Support Message
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-color: #3a494b;" />
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    res.json({ message: "Support email sent successfully" });
  } catch (err) {
    next(err);
  }
}
