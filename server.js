const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve your static frontend (adjust folder if needed)
app.use(express.static(__dirname));

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",          // or your provider SMTP host
      port: 587,
      secure: false,
      auth: {
        user: "sorvenglobal@gmail.com",      // business email
        pass: "xcvrkllllqnocruc",                // app password
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <sorvenglobal@gmail.com>`,
      to: "sorvenglobal@gmail.com",             // company inbox
      subject: "New contact inquiry from website",
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });

    res.status(200).json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send" });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
