import { firestore } from 'firebase-admin';

export interface EmailDocument {
  to: string;
  message: Message;
  createdAt?: firestore.Timestamp;
  error?: string;
} 

export interface Message {
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  content?: string;
  path?: string;
}
