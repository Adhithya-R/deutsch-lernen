// "Brücke" tab: one idea from Tamil Nadu next to its German counterpart.
export type Pair = {
  tn: { big: string; ta?: boolean; text: string };
  de: { big: string; text: string };
};

export const pairs: Pair[] = [
  { tn: { big: "வணக்கம்", ta: true, text: "Hands folded, a warm smile." }, de: { big: "Guten Tag", text: "A handshake and eye contact." } },
  { tn: { big: "Filter kaapi", text: "Fresh and frothy in a steel tumbler." }, de: { big: "Kaffee und Kuchen", text: "Coffee and cake in the afternoon." } },
  { tn: { big: "Idli and chutney", text: "A soft, steamed breakfast." }, de: { big: "Brötchen", text: "Fresh rolls with butter and jam." } },
  { tn: { big: "Pongal", text: "The harvest festival in January." }, de: { big: "Erntedankfest", text: "Thanks for the harvest, in autumn." } },
  { tn: { big: "Deepavali", text: "Rows of lamps light the street." }, de: { big: "Weihnachtsmarkt", text: "Lights and stalls in December." } },
  { tn: { big: "Meenakshi Temple", text: "A towering gateway visitors travel far to see." }, de: { big: "Kölner Dom", text: "Twin spires visitors travel far to see." } },
];
