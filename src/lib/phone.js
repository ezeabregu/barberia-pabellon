// Normalizes an Argentine phone number to international digits-only form
// suitable for wa.me links: "549" + area code + number (13 digits total).
// Returns null if the input can't be normalized confidently.
//
// Handles the most common formats:
//   "+54 9 351 558 5216"  -> "5493515585216"
//   "3515585216"          -> "5493515585216"  (area + number, 10 digits)
//   "0351 15 558 5216"    -> "5493515585216"  (legacy 0 + 15 prefix)
//   "11 5542 5897"        -> "5491155425897"  (CABA, 2-digit area)
//
// Returns null for ambiguous inputs missing the area code, e.g. "155542589".
export function normalizeArPhone(input) {
  let digits = String(input || "").replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("549") && digits.length === 13) return digits;

  if (digits.startsWith("54") && digits.length === 12 && digits[2] !== "9") {
    return "549" + digits.slice(2);
  }

  if (digits.startsWith("0")) digits = digits.slice(1);

  if (digits.length === 12) {
    for (const areaLen of [2, 3, 4]) {
      if (digits.substring(areaLen, areaLen + 2) === "15") {
        const candidate =
          digits.substring(0, areaLen) + digits.substring(areaLen + 2);
        if (candidate.length === 10) return "549" + candidate;
      }
    }
  }

  if (digits.length === 10) return "549" + digits;

  return null;
}
