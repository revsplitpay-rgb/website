// Illustrative numbers for "Example" visuals only. These are not customer data
// and are always labeled "Example" on the page. Role labels, never names.

export const payoutExamples = [
  { role: "Closer", amount: "$485.50", status: "Paid" as const, when: "Paid Oct 14" },
  { role: "Setter", amount: "$242.75", status: "Pending" as const, when: "Pays Oct 21" },
  { role: "Closer", amount: "$970.00", status: "Locked" as const, when: "Hold ends Oct 24" },
  { role: "Partner", amount: "$120.00", status: "Failed" as const, when: "Retry after account fix" },
];

export const leaderboardExamples = [
  { rank: 1, role: "Closer", tier: "Platinum", value: 82 },
  { rank: 2, role: "Closer", tier: "Gold", value: 64 },
  { rank: 3, role: "Setter", tier: "Gold", value: 51 },
  { rank: 4, role: "Setter", tier: "Silver", value: 33 },
];

export const awardRuleExample = "Hit $50K in sales this month and get a $500 bonus";
export const boostExample = "+2% on the next deals";

// The "before" spreadsheet in the problem section: deliberately messy.
export const spreadsheetExample = {
  columns: ["Deal", "Sale", "Closer", "Setter", "Paid?"],
  rows: [
    { cells: ["Coaching #1042", "$5,000", "10%", "5%?", "No"], flag: "setter" as const },
    { cells: ["Program #1043", "$3,500", "10%", "—", "Yes"], flag: null },
    { cells: ["Course #1044", "$2,000", "??", "5%", "Refund?"], flag: "closer" as const },
    { cells: ["Retainer #1045", "$8,000", "8%", "5%", "Partly"], flag: "paid" as const },
  ],
  notes: ["Who closed this one?", "Refunded — fix the split later"],
};
