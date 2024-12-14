import nodemailer from "nodemailer";

class EmailConfig {
  private static instance: EmailConfig;
  private host: string;
  private port: number;
  private secure: boolean;
  private auth: {
    user: string;
    pass: string;
  };

  constructor(
    host: string,
    port: number,
    secure: boolean,
    auth: { user: string; pass: string }
  ) {
    this.host = host;
    this.port = port;
    this.secure = secure;
    this.auth = auth;
  }

  getInstance() {
    if (!EmailConfig.instance) {
      EmailConfig.instance = new EmailConfig(
        this.host,
        this.port,
        this.secure,
        this.auth
      );
    }
    return EmailConfig.instance;
  }

  getConfig() {
    return {
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.auth.user,
        pass: this.auth.pass,
      },
    };
  }

  async getTransporter() {
    return nodemailer.createTransport(this.getConfig());
  }

  async sendMail(to: string, subject: string, text: string, from: string) {
    const transporter = await this.getTransporter();
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    transporter.close();
  }
}

export default EmailConfig;
