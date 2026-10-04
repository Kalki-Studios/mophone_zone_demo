export const buildWhatsappLink = (phone: string, text: string) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
