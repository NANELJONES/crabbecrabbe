export const CASE_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "completed", label: "Completed" },
  { value: "adjourned", label: "Adjourned" },
];

export const COURTS_OPTIONS = [
  { value: "", label: "All courts" },
  { value: "supremeCourt", label: "Supreme Court" },
  { value: "courtOfAppeal", label: "Court of Appeal" },
  { value: "highCourt", label: "High Court" },
];

export function formatCaseStatus(value) {
  return CASE_STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function formatCourt(value) {
  return COURTS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Supports a single enum value or an array of court ids */
export function formatCourts(courts) {
  if (!courts) return null;
  if (Array.isArray(courts)) {
    return courts.map(formatCourt).filter(Boolean).join(", ");
  }
  return formatCourt(courts);
}
