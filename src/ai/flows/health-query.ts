// src/ai/flows/health-query.ts
'use server';

/**
 * @fileOverview Provides AI-powered answers to patient's health questions using the Gemini API.
 *
 * - askHealthQuestion - A function that accepts a health-related question and returns an AI-generated answer.
 * - HealthQueryInput - The input type for the askHealthQuestion function.
 * - HealthQueryOutput - The return type for the askHealthQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthQueryInputSchema = z.object({
  question: z.string().describe('The health-related question from the patient.'),
});
export type HealthQueryInput = z.infer<typeof HealthQueryInputSchema>;

const HealthQueryOutputSchema = z.object({
  answer: z.string().describe('The AI-powered answer to the health question.'),
});
export type HealthQueryOutput = z.infer<typeof HealthQueryOutputSchema>;

export async function askHealthQuestion(input: HealthQueryInput): Promise<HealthQueryOutput> {
  return healthQueryFlow(input);
}

const healthQueryPrompt = ai.definePrompt({
  name: 'healthQueryPrompt',
  input: {schema: HealthQueryInputSchema},
  output: {schema: HealthQueryOutputSchema},
  prompt: `You are a helpful AI assistant providing general health information to patients.

  Answer the following question:
  {{question}}

  Keep your answer concise and easy to understand. Do not provide medical diagnoses or treatment advice.
  If the question is beyond your capabilities, respond that you cannot provide an answer.
`,
});

const healthQueryFlow = ai.defineFlow(
  {
    name: 'healthQueryFlow',
    inputSchema: HealthQueryInputSchema,
    outputSchema: HealthQueryOutputSchema,
  },
  async input => {
    const {output} = await healthQueryPrompt(input);
    return output!;
  }
);
