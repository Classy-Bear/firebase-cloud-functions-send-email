import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';

/**
 * Updates the email document status and related fields
 * @param docRef - Reference to the email document
 * @param error - Optional error message
 */
export const updateEmailStatus = async (docRef: DocumentReference, error?: string): Promise<void> => {
    try {
        await docRef.update({
            updatedAt: Timestamp.now(),
            ...(error && { error }),
        });
        logger.info(`Email status updated`, { documentId: docRef.id });
    } catch (err) {
        logger.error('Error updating email status', err);
        throw err;
    }
}; 
