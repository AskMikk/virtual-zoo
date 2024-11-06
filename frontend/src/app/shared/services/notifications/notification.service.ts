import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'delete' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private counter = 0;

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  show(message: string, type: 'success' | 'delete' | 'info' = 'info'): void {
    const id = this.counter++;
    const notification: Notification = { message, type, id };
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([...currentNotifications, notification]);

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: number): void {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next(currentNotifications.filter((n) => n.id !== id));
  }
}
