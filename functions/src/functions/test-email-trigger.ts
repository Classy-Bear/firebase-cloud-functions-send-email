import { onRequest } from 'firebase-functions/v2/https';
import { handleTestEmail } from '../handlers/test-email-handler';

/**
 * Test function to verify the email trigger functionality
 * This function is exposed as an HTTP endpoint for testing purposes
 */
export const testEmailTrigger = onRequest(handleTestEmail); 