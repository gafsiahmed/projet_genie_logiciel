// src/infrastructure/strategies/EmailNotification.ts
import sgMail from "@sendgrid/mail";
import { NotificationStrategy } from "./INotificationStrategy";

export class EmailNotification implements NotificationStrategy {
  async send(to: string, subject: string, content: string): Promise<void> {
    const msg = {
      to,
      from: "opusLab@gmail.com",
      subject,
      html: content,
    };

    await sgMail.send(msg);
  }
}
