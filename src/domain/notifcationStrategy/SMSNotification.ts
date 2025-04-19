// src/infrastructure/strategies/SMSNotification.ts
import { NotificationStrategy } from "./INotificationStrategy";

export class SMSNotification implements NotificationStrategy {
  async send(to: string, subject: string, content: string): Promise<void> {
    console.log(`SMS sent to ${to}: ${subject} - ${content}`);
    // intégration Twilio ou autre ici
    
  }
}
