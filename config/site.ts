/**
 * Os textos e contatos institucionais agora são editáveis pela cliente em
 * `/admin/geral` (armazenados via `lib/content.ts`). Este arquivo só guarda o
 * helper de link do WhatsApp, reutilizado por todas as seções.
 */
export function createWhatsAppLink(whatsappNumber: string, message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
