import { Request } from 'firebase-functions/https';
import { Response } from "express";
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';
import { EmailDocument } from '../types/email';
import { validateEmailDocument } from '../utils/email';

/**
 * Handles the test email trigger request
 * @param req - The HTTP request
 * @param res - The HTTP response
 */
export const handleTestEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const testEmail = req.body as EmailDocument;
    validateEmailDocument(testEmail);

    const docRef = await admin.firestore().collection('mail').add(testEmail);
    
    logger.info('Test email document created', { documentId: docRef.id });
    res.status(200).json({
      success: true,
      message: 'Test email triggered successfully',
      documentId: docRef.id,
    });
  } catch (error) {
    logger.error('Error in test endpoint', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}; 