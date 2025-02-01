import { logger } from 'firebase-functions';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { EmailDocument } from '../types/email';
import { validateEmailDocument } from '../utils/email';
import { updateEmailStatus } from '../helpers/email';

/**
 * Handles the email document creation event
 * @param event - The Firestore event containing the document data
 */
export const handleEmailCreation = async (
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, { emailId: string }>
): Promise<void> => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.error('No data associated with the event');
    return;
  }

  const emailData = snapshot.data() as EmailDocument;
  const docRef = snapshot.ref;
  const documentId = event.params.emailId;
  const recipient = emailData.to;

  logger.info('Processing new email request', { documentId, recipient });

  try {
    // Validate document
    validateEmailDocument(emailData);

    // The extension will handle the actual email sending based on the document structure
    // We just need to ensure the document is properly formatted and valid
    await updateEmailStatus(docRef);

    logger.info('Email document processed successfully', { documentId });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Error processing email request', errorMessage);
    await updateEmailStatus(docRef, errorMessage);
    throw error;
  }
}; 