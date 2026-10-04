import { type } from 'arktype';

export const contactSchema = type({
  '+': 'reject',
  name: type('string.trim').pipe(type('string <= 100')),
  email: type('string.trim').pipe(type('string.email <= 254')),
  message: type('string.trim').pipe(type('0 < string <= 5000')),
});

export type ContactInput = typeof contactSchema.infer;
export const accessKeySchema = type('string.uuid');
const responseSchema = type({ success: 'boolean' });
const captchaResponseSchema = type({ response: 'string > 0' });

export interface CaptchaClient {
  execute(widgetId: undefined, options: { async: true }): Promise<{ response: string }>;
  reset(): void;
}

export async function getCaptchaToken(client: CaptchaClient | undefined): Promise<string> {
  if (!client) throw new Error('Captcha is not ready');
  const result: unknown = await client.execute(undefined, { async: true });
  return captchaResponseSchema.assert(result).response;
}

export async function sendContact(
  input: ContactInput,
  accessKey: string,
  subject: string,
  captcha: string,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const fields = contactSchema.assert(input);
  accessKeySchema.assert(accessKey);
  type('string > 0').assert(captcha);
  const response = await fetcher('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      access_key: accessKey,
      subject,
      from_name: 'dio motion.',
      'h-captcha-response': captcha,
    }),
    signal: AbortSignal.timeout(15000),
  });
  const result: unknown = await response.json();
  if (!response.ok || !responseSchema.assert(result).success) {
    throw new Error('Contact submission failed');
  }
}
