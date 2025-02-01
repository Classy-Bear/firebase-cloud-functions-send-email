/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { handleEmailCreation } from './handlers/email-handler';
import { handleTestEmail } from './handlers/test-email-handler';

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Cloud Function triggered on creation of new email documents
 * Processes the email request and updates the document status
 */
export const processEmailTrigger = onDocumentCreated('mail/{emailId}', handleEmailCreation);

/**
 * Test function to verify the email trigger functionality
 * This function is exposed as an HTTP endpoint for testing purposes
 */
export const testEmailTrigger = functions.https.onRequest(handleTestEmail);

