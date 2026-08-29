// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Configuration
// Change WHATSAPP_NUMBER to your business number (with country code, no + or spaces)
// Example: India +91 98765 43210  →  "919876543210"
// ─────────────────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918690020072';

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Channel Link
// Replace with your actual WhatsApp Channel invite URL.
// To get this: Open WhatsApp → Channels → Your Channel → Share → Copy link
// Example: "https://whatsapp.com/channel/0029VaXXXXXXXXXXXXXXXX"
// ─────────────────────────────────────────────────────────────────────────────
export const WHATSAPP_CHANNEL_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Open the WhatsApp Channel in a new tab.
 * Used for general "Chat with us" / floating buttons / navbar.
 */
export function openWhatsAppChannel() {
  window.open(WHATSAPP_CHANNEL_LINK, '_blank', 'noopener,noreferrer');
}

/**
 * Build a WhatsApp click-to-chat URL with a pre-filled message.
 *
 * @param {Object} params
 * @param {string} params.productName   - e.g. "Aurelia 3-Seater Velvet Sofa"
 * @param {string} params.productId     - e.g. "sofa-1"
 * @param {number} params.price         - e.g. 45999
 * @param {string} [params.colorName]   - e.g. "Emerald Green"
 * @returns {string} Full WhatsApp URL
 */
export function buildWhatsAppUrl({ productName, productId, price, colorName }) {
  const pageUrl = window.location.href;

  const lines = [
    `*✨ EFIVE STUDIO INQUIRY ✨*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Hello Efive Studio Team! 👋`,
    `I am highly interested in purchasing the following item from your store:`,
    ``,
    `🛍️ *PRODUCT DETAILS*`,
    `• *Name:* ${productName}`,
    `• *Product ID:* ${productId}`,
    `• *Price:* ₹${price.toLocaleString('en-IN')}`,
    colorName ? `• *Selected Color:* ${colorName}` : null,
    ``,
    `🔗 *STORE PAGE LINK*`,
    `${pageUrl}`,
    ``,
    `Could you please share some more details, availability, and delivery options for this product?`,
    ``,
    `Thank you! 😊`
  ]
    .filter((l) => l !== null)
    .join('\n');

  const encoded = encodeURIComponent(lines);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Open WhatsApp in a new tab for a specific product.
 */
export function openWhatsApp(params) {
  window.open(buildWhatsAppUrl(params), '_blank', 'noopener,noreferrer');
}

/**
 * Open WhatsApp in a new tab for a specific interior design service inquiry.
 */
export function openWhatsAppInteriorInquiry(serviceName) {
  const lines = [
    `*✨ EFIVE STUDIO INQUIRY ✨*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Hello Efive Studio Team! 👋`,
    `I am highly interested in your luxury interior design services:`,
    ``,
    `🏛️ *SERVICE DETAILS*`,
    `• *Inquiry for:* ${serviceName}`,
    ``,
    `Could you please share some of your recent portfolios, pricing structures, and guide me on how to book a design consultation?`,
    ``,
    `Thank you! 😊`
  ].join('\n');

  const encoded = encodeURIComponent(lines);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

