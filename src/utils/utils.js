import DOMPurify from 'dompurify';

export function sanitizeHTML(html) {
  return DOMPurify.sanitize(html);
}
