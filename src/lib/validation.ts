/** Practical email: local-part + domain + TLD, no spaces or consecutive dots. */
export const EMAIL_PATTERN =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export const NAME_PATTERN = /^(?=.*\p{L})[\p{L} .'-]{2,80}$/u;

export function isValidEmail(value: string) {
  const email = value.trim();
  if (!email || email.length > 254) return false;
  if (email.includes("..") || email.includes(" ")) return false;
  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@")) return false;
  const local = email.slice(0, at);
  if (local.length > 64) return false;
  return EMAIL_PATTERN.test(email);
}

export function isValidName(value: string) {
  return NAME_PATTERN.test(value.trim());
}

export function isValidEventDate(value: string) {
  const date = value.trim();
  if (date.length < 4 || date.length > 40) return false;
  return /\d/.test(date) || /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(date);
}
