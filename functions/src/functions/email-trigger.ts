import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { handleEmailCreation } from '../handlers/email-handler';

/**
 * Cloud Function triggered on creation of new email documents
 * Processes the email request and updates the document status
 */
export const processEmailTrigger = onDocumentCreated('mail/{emailId}', handleEmailCreation); 