export const CONTACT_PHONE = {
  display: "+233 546 98 45 42",
  href: "tel:+233546984542",
};

export const CONTACT_EMAIL = {
  display: "Info@crabbecrabbeandco.com",
  href: "mailto:Info@crabbecrabbeandco.com",
};

export const CONTACT_LOCATIONS = [
  {
    id: "accra",
    title: "Accra (Tse Addo)",
    address:
      "No.D002 Tunma Street (Tse Addo High Street) Behind Trade Fair, East La, Accra, Accra, Ghana",
  },
  {
    id: "Weija",
    title: "Weija",
    address: "Weija",
  },
];

/** Shared list for footer, contact page sidebar, etc. */
export const CONTACT_ENTRIES = [
  {
    id: "phone",
    href: CONTACT_PHONE.href,
    lines: [CONTACT_PHONE.display],
  },
  {
    id: "email",
    href: CONTACT_EMAIL.href,
    lines: [CONTACT_EMAIL.display],
  },
  ...CONTACT_LOCATIONS.map((location) => ({
    id: location.id,
    href: null,
    lines: [location.title, location.address],
  })),
];
