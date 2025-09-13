'use server';

import {
  simulateVerification,
  type SimulateVerificationInput,
  type SimulateVerificationOutput,
} from '@/ai/flows/simulate-verification-results';

export async function handleVerification(
  data: SimulateVerificationInput
): Promise<SimulateVerificationOutput> {
  try {
    const result = await simulateVerification(data);
    return result;
  } catch (error) {
    console.error('Verification failed:', error);
    return {
      isValid: false,
      reason: 'An unexpected error occurred during verification. Please try again later.',
    };
  }
}
