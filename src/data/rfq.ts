export const inquiryTypes = ["Bulk Quote", "Sample Box", "OEM Project"] as const;
export const quantityRanges = ["10–50", "50–200", "200–500", "500–1,000", "1,000+"] as const;
export const customizationOptions = ["No Logo (Blank)", "Laser Engraved", "Silk Screen", "Custom Colorway", "Custom Packaging", "Full ODM"] as const;
export type InquiryType = (typeof inquiryTypes)[number];
export type RfqDraft = {
  inquiryType: InquiryType;
  contactName: string;
  email: string;
  companyName: string;
  country: string;
  postalCode: string;
  noPostalCode: boolean;
  targets: string[];
  quantityRange: string;
  exactQuantity: string;
  customization: string[];
  notes: string;
  website: string;
};
export function emptyDraft(): RfqDraft {
  return { inquiryType: "Bulk Quote", contactName: "", email: "", companyName: "", country: "", postalCode: "", noPostalCode: false, targets: [], quantityRange: "", exactQuantity: "", customization: [], notes: "", website: "" };
}
export type RfqRequest = RfqDraft & { submissionId: string; };
