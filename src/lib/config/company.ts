/**
 * Official Company & Legal Entity Configuration for PrimaVPS
 * 
 * Used across the website for DBID (Ministry of Commerce),
 * SSLCOMMERZ Merchant Verification, and Trade License Compliance.
 * 
 * IMPORTANT: Update placeholder values with actual Trade License and DBID
 * details as soon as the certificates are issued.
 */

export const COMPANY_INFO = {
  // Brand & Legal Trading Name
  brandName: "primavps",
  legalNameBn: "প্রিমার টেকনোলজিস",
  legalNameEn: "Prima Technologies",
  taglineBn: "সুরক্ষিত ও হাই-স্পিড গ্লোবাল ক্লাউড ও ডেডিকেটেড ISP সার্ভার",
  taglineEn: "Secure & High-Speed Global Cloud & Dedicated ISP Servers",

  // Ownership Details (Must match Trade License exactly)
  proprietorNameBn: "মো: স্বত্বাধিকারী", // Placeholder - Update with exact owner name
  proprietorNameEn: "Proprietor / Managing Partner",

  // Registration & License Details
  tradeLicenseNo: "TRAD/DNCC/049281/2026", // Placeholder format
  dbidNo: "DBID-83920194", // Placeholder format
  tinNo: "TIN-749281948291", // Optional Taxpayer Identification Number

  // Registered Physical Address (Must match Trade License exact address)
  address: {
    streetBn: "হাউস #১২, রোড #১০, ব্লক ডি",
    streetEn: "House #12, Road #10, Block D",
    areaBn: "বনানী বা/এ",
    areaEn: "Banani C/A",
    cityBn: "ঢাকা",
    cityEn: "Dhaka",
    postalCode: "1213",
    countryBn: "বাংলাদেশ",
    countryEn: "Bangladesh",
    // Full formatted string
    fullBn: "হাউস #১২, রোড #১০, ব্লক ডি, বনানী বা/এ, ঢাকা ১২১৩, বাংলাদেশ",
    fullEn: "House #12, Road #10, Block D, Banani C/A, Dhaka 1213, Bangladesh",
  },

  // Contact Channels
  contact: {
    phone: "+880 1700-000000", // Official Bangladeshi contact number for DBID audit
    phoneDisplay: "+880 1700-000000",
    phoneTel: "+8801700000000",
    whatsappNumber: "8801700000000",
    whatsappUrl: "https://wa.me/8801700000000?text=Hello%20primavps,%20I%20need%20assistance.",
    supportEmail: "support@primavps.com",
    billingEmail: "billing@primavps.com",
    legalEmail: "legal@primavps.com",
  },

  // Operations & Support
  supportHoursBn: "২৪/৭ লাইভ টেকনিক্যাল সাপোর্ট ও ঢাকা অপারেশনস ডেস্ক",
  supportHoursEn: "24/7 Live Technical Support & Dhaka Operations Desk",
} as const;

export type CompanyInfo = typeof COMPANY_INFO;
