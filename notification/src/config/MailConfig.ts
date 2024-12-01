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
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    return this.transporter;
  }
}

const emailService = new EmailService();

export { emailService, EmailService };
