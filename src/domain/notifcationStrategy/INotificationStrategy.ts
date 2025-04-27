export interface NotificationStrategy {
    send(to: string, subject: string, content: string): Promise<void>;
  }