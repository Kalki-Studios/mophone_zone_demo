export const SHOP = {
  name: "Mo PhoneZone",
  tagline: "Choose Your World",
  phones: { primary: "8093171718", secondary: "9090100880" },
  whatsappNumber: "918093171718",
  email: "mophonezone@gmail.com",
  address: {
    line1: "Main Road, in front of Reliance Smart",
    town: "Semiliguda",
    district: "Koraput",
    state: "Odisha",
    pin: "764036",
  },
  instagram: {
    handle: "mo_phonezone_semiliguda",
    url: "https://www.instagram.com/mo_phonezone_semiliguda/",
  },
  hours: { open: "10:00", close: "21:30", days: [0, 1, 2, 3, 4, 5, 6], daysConfirmed: false }, // TODO_CONFIRM
  googleReviewUrl: "", // empty = hide the button. TODO_CONFIRM
  features: { sellExchange: true }, // TODO_CONFIRM
  studioCredit: "Website by Kalki Studio",
  demoMode: true,
} as const;

export const GRADE_HELP = { // TODO_CONFIRM with owner before launch
  A: "Looks close to new.",
  B: "Light marks or scratches.",
  C: "Visible wear.",
};
