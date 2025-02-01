import { EmailDocument } from '../types/email';

/**
 * Validates email format using regex
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates the email document structure and data
 * @param data - The email document data to validate
 * @throws Error if validation fails
 */
export const validateEmailDocument = (data: EmailDocument): void => {
  if (!data.to || !isValidEmail(data.to)) {
    throw new Error('Invalid or missing recipient email address');
  }
  if (!data.message.subject || data.message.subject.trim().length === 0) {
    throw new Error('Subject is required');
  }
  if (!data.message.html || data.message.html.trim().length === 0) {
    throw new Error('HTML is required');
  }
}; 