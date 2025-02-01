# Firebase Email Trigger System

This project implements an automated email sending system using Firebase Cloud Functions and the "Trigger Email from Firestore" extension. The system allows sending emails with HTML content and attachments based on document changes in Firestore.

Understand the how "Using the Trigger Email from Firestore" extension works on the [docs](https://firebase.google.com/docs/extensions/official/firestore-send-email?_gl=1*w2i9a4*_ga*NzYyNjk3MTg2LjE3MzEyNTcyNTc.*_ga_CW55HF8NVT*MTczODM4Mzg0My40NS4xLjE3MzgzODQ4NTguNDkuMC4w).

## Features

- Automated email sending based on Firestore document changes
- HTML email support with attachments
- Type-safe implementation using TypeScript
- Comprehensive logging using Firebase logger
- Input validation and error handling
- Test endpoint for easy verification
- Clean architecture with separation of concerns

## Prerequisites

- Node.js 22 or later
- Firebase CLI installed
- Firebase project with Firestore enabled
- "Trigger Email from Firestore" [extension installed](https://extensions.dev/extensions/firebase/firestore-send-email)

## Project Structure

```
functions/src/
├── functions/          # Cloud Functions definitions
│   ├── email-trigger.ts
│   └── test-email-trigger.ts
├── handlers/           # Function handlers
│   ├── email-handler.ts
│   └── test-email-handler.ts
├── helpers/           # Helper functions
│   └── email.ts
├── types/            # TypeScript interfaces
│   └── email.ts
├── utils/            # Utility functions
│   └── email.ts
└── index.ts         # Main entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd functions
   npm install
   ```
3. Deploy the functions:
   ```bash
   npm run deploy
   ```

## Usage

### Email Document Structure

To trigger an email, create a document in the `mail` collection with the following structure:

```typescript
interface EmailDocument {
  to: string;
  message: {
    subject: string;
    html: string;
    attachments?: Array<{
      filename: string;
      content?: string;
      path?: string;
    }>;
  };
  createdAt?: Timestamp;
  error?: string;
}
```

### Testing

You can test the email functionality using the provided HTTP endpoint:

```bash
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/testEmailTrigger \
-H "Content-Type: application/json" \
-d '{
  "to": "recipient@example.com",
  "message": {
    "subject": "Test Email",
    "html": "<h1>Hello World</h1>"
  }
}'
```

### Development

1. Run the emulator for local testing:
   ```bash
   npm run serve
   ```

2. Watch for changes during development:
   ```bash
   npm run build:watch
   ```

## Validation

The system validates:
- Email format
- Required fields (to, subject, html content)
- Document structure

## Error Handling

Errors are:
- Logged using Firebase logger
- Stored in the document's `error` field
- Returned with appropriate HTTP status codes (for the test endpoint)

## Logging

All operations are logged using Firebase logger for better monitoring and debugging. View logs using:

```bash
npm run logs
# or
firebase functions:log
```

## Security

The system implements:
- Input validation
- Type checking
- Secure email handling through Firebase extension

## License

MIT 