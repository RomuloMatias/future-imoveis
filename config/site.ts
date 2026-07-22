/**
 * Informações institucionais e de conversão usadas em toda a landing page.
 * Atualize este arquivo quando o contato comercial ou o domínio mudarem.
 */
export const siteConfig = {
  name: "Future Imóveis",
  creci: "18705 J",
  domain: "https://futureimoveisce.com.br",
  whatsappNumber: "5585999999999",
  projectName: "Condomínio Marbello",
} as const;

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
