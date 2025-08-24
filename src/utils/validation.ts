const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailData {
  fullName: string;
  email: string;
  subject: string;
  description: string;
}

export const validateEmailData = (data: unknown): data is EmailData => {
  if (!data || typeof data !== 'object') return false;

  const { fullName, email, subject, description } = data as Record<string, unknown>;

  if (!fullName || !email || !subject || !description) return false;

  if (![fullName, email, subject, description].every((field) => typeof field === 'string'))
    return false;

  const trimmedData = {
    fullName: (fullName as string).trim(),
    email: (email as string).trim(),
    subject: (subject as string).trim(),
    description: (description as string).trim(),
  };

  if (Object.values(trimmedData).some((value) => !value)) return false;

  if (!EMAIL_REGEX.test(trimmedData.email)) return false;

  const { fullName: name, subject: sub, description: desc } = trimmedData;

  return (
    name.length >= 3 &&
    name.length <= 20 &&
    sub.length >= 10 &&
    sub.length <= 50 &&
    desc.length >= 50 &&
    desc.length <= 500
  );
};
