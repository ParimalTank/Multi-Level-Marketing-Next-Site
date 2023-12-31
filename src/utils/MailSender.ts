import nodemailer from 'nodemailer';

export async function sendMail(subject: string, toEmail: string, otpText: string) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: "parimaltank132@gmail.com",
            pass: "qorlqlshjnfdleoy"
        },
    });

    const mailOptions: any = {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject: subject,
        text: otpText,
    };

    transporter.sendMail(mailOptions, function (error: any, info) {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Email Sent");
            return true;
        }
    });
}