'use server';

/**
 * @fileOverview Simulates the backend verification process using an LLM.
 *
 * - simulateVerification - Simulates whether a given certificate and document appear authentic.
 * - SimulateVerificationInput - The input type for the simulateVerification function.
 * - SimulateVerificationOutput - The return type for the simulateVerification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateVerificationInputSchema = z.object({
  certificateId: z.string().describe('The certificate ID or roll number.'),
  documentDataUri: z
    .string()
    .describe(
      'The document associated with the certificate, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // fixed
    ),
});
export type SimulateVerificationInput = z.infer<typeof SimulateVerificationInputSchema>;

const SimulateVerificationOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the certificate and document appear valid.'),
  reason: z.string().describe('The reason for the validity determination.'),
});
export type SimulateVerificationOutput = z.infer<typeof SimulateVerificationOutputSchema>;

export async function simulateVerification(input: SimulateVerificationInput): Promise<SimulateVerificationOutput> {
  return simulateVerificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateVerificationPrompt',
  input: {schema: SimulateVerificationInputSchema},
  output: {schema: SimulateVerificationOutputSchema},
  prompt: `You are an expert in academic credential verification. Given a certificate ID and a document, you will determine if they appear authentic.

  Provide a reasoned determination in the 'reason' field. Set the 'isValid' field to true if the certificate and document appear authentic, and false otherwise.

  Consider factors such as the consistency of the certificate ID with the document, the overall appearance of the document, and any other relevant information.

  Certificate ID: {{{certificateId}}}
  Document: {{media url=documentDataUri}}`,
});

const simulateVerificationFlow = ai.defineFlow(
  {
    name: 'simulateVerificationFlow',
    inputSchema: SimulateVerificationInputSchema,
    outputSchema: SimulateVerificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
