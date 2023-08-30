import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

//function to send email to user for verification or reset password
//for now this is limited in test phase but when we host it we can use it for real
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //hashing the user id for security purpose and update the user in the database
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //updating the user in the database with the hashed token and token expiry time for verification
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }

    //updating the user in the database with the hashed token and token expiry time for reset password
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //creating transporter for sending email using nodemailer
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    //mail options for sending email to user for verification or reset password
    const mailOptions = {
      from: "ss2519@it.jgec.ac.in",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpass"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste the link below in your browser.<br>
      ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpass"
      }?token=${hashedToken}
       </p>`,
    };

    //sending email to user
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
