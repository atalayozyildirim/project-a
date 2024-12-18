import nodemailer from "nodemailer";

class EmailService {
  private transporter!: nodemailer.Transporter;

  getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      throw new Error("Transporter not found");
    }
    return this.transporter;
  }

  connect() {
    this.transporter = nodemailer.createTransport({
      service: "yandex",
      port: 465,
      auth: {
        user: "cheafchat@yandex.com",
        pass: "sqjqxhtukebrtrtv",
      },
    });

    return this.transporter;
  }
}

const emailService = new EmailService();

export { emailService, EmailService };
