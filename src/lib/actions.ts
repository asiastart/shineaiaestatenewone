'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().email('Invalid email or contact').or(z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
});

const sellFormSchema = z.object({
  name: z.string().min(2, 'Name required'),
  contact: z.string().email('Valid email required').or(z.string().regex(/^\+?[\d\s\-()]+$/, 'Valid phone required')),
  location: z.string().optional(),
  property_details: z.string().optional(),
  intent: z.enum(['buy', 'sell', 'rent']).optional(),
});

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      message: formData.get('message'),
      subject: formData.get('subject'),
    };

    const validated = contactFormSchema.parse(data);

    // TODO: Send to backend/email service
    // For now, just log
    console.log('Contact form submitted:', validated);

    return { success: true, message: 'Thank you. We will be in touch.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export async function submitSellForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      location: formData.get('location'),
      property_details: formData.get('property_details'),
    };

    const validated = sellFormSchema.parse(data);

    // TODO: Send to backend/email service
    console.log('Sell form submitted:', validated);

    return { success: true, message: 'Thank you. We will be in touch shortly.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}
