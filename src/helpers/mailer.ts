// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";
// import User from "@/models/userModel";

// export async function sendEmail({ email, emailType, userId }: any) {
//   try {
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(
//         userId,
//         { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
//         // {new:true,runValidators:true}
//       );
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           forgetPasswordToken: hashedToken,
//           forgetPasswordTokenExpiry: Date.now() + 3600000,
//         }
//         // {new:true,runValidators:true}
//       );
//     }
//     // Looking to send emails in production? Check out our Email API/SMTP product!
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "760752262bf3bf",
//         pass: "7be756d48eb5eb",
//       },
//     });
//     const domainName = "http://localhost:3000";

//     const mailOptions = {
//       from: "shopmanager1@gmail.com",
//       to: email,
//       subject:
//         emailType === "VERIFY" ? "verify your emaiil" : "Reset your password",

//       html: `<p>Click <a href="${domainName}/
//       verifyemail?token=${hashedToken}">here</a> to
//       ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       }</p><br><p>${domainName}/verifyemail?token=${hashedToken}</p>`,
//     };
//     const mailResponse = await transport.sendMail(mailOptions);

//     return mailResponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
