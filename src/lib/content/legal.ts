export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updated: "03/02/2026",
  sections: [
    {
      heading: "1. Introduction",
      paragraphs: [
        "Welcome to The Shrub Lodge. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.",
        "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website: www.theshrublodge.com.",
        "By using our website or services, you agree to the terms of this Privacy Policy.",
      ],
    },
    {
      heading: "2. About Us",
      paragraphs: [
        "The Shrub Lodge is a family-run lodge located in Victoria Falls, Zimbabwe, offering accommodation and travel experiences.",
        "Contact Details:",
      ],
      list: [
        "The Shrub Lodge",
        "649 Rynard Road",
        "Victoria Falls, Zimbabwe",
        "Email: reservations@theshrublodge.com",
        "Phone: +263 788 746 909",
        "If you have any questions about this Privacy Policy, please contact us using the details above.",
      ],
    },
    {
      heading: "3. Information We Collect",
      paragraphs: ["We may collect the following types of personal information:"],
    },
    {
      heading: "3.1 Information You Provide",
      paragraphs: [
        "When you interact with our website, we may collect:",
      ],
      list: [
        "Full name",
        "Email address",
        "Phone number",
        "Booking details",
        "Travel dates",
        "Special requests",
        "Messages sent through contact forms",
      ],
    },
    {
      heading: "3.2 Automatically Collected Information",
      paragraphs: [
        "When you visit our website, we may automatically collect:",
      ],
      list: [
        "IP address",
        "Browser type",
        "Device type",
        "Pages visited",
        "Date and time of visits",
        "Website usage data",
      ],
    },
    {
      heading: "4. How We Use Your Information",
      paragraphs: ["We use your information to:"],
      list: [
        "Process bookings and inquiries",
        "Communicate with you",
        "Confirm reservations",
        "Provide customer service",
        "Improve our website",
        "Send booking confirmations",
        "Arrange tours or activities",
        "Maintain security",
        "Comply with legal requirements",
      ],
    },
    {
      heading: "5. Legal Basis for Processing",
      paragraphs: ["We process your information based on:"],
      list: [
        "Your consent",
        "Booking and service agreements",
        "Legitimate business interests",
        "Legal obligations",
      ],
    },
    {
      heading: "6. Sharing Your Information",
      paragraphs: [
        "We may share your information with:",
        "Service Providers",
      ],
      list: [
        "Booking systems",
        "Payment processors",
        "Email providers",
        "IT support services",
      ],
    },
    {
      heading: "Travel Partners",
      paragraphs: [
        "If you book activities or tours, we may share relevant information with:",
      ],
      list: ["Tour operators", "Transport providers", "Activity organizers"],
    },
    {
      heading: "7. Data Storage and Security",
      paragraphs: [
        "We take reasonable steps to protect your personal information from:",
      ],
      list: [
        "Unauthorized access",
        "Loss",
        "Misuse",
        "Disclosure",
        "Alteration",
      ],
    },
    {
      heading: "8. Data Retention",
      paragraphs: ["We retain personal information only as long as necessary to:"],
      list: [
        "Fulfill bookings",
        "Provide services",
        "Meet legal requirements",
        "Resolve disputes",
      ],
    },
    {
      heading: "9. Cookies and Tracking",
      paragraphs: ["Our website may use cookies to:"],
      list: [
        "Improve website performance",
        "Remember preferences",
        "Analyze traffic",
        "Enhance user experience",
      ],
    },
    {
      heading: "10. Third-Party Links",
      paragraphs: [
        "Our website may contain links to third-party websites, including activity providers or partners.",
        "We are not responsible for the privacy practices of those websites. We encourage you to read their privacy policies.",
      ],
    },
    {
      heading: "11. International Visitors",
      paragraphs: [
        "As a lodge serving international guests visiting Victoria Falls, your information may be processed in Zimbabwe or other countries where our service providers operate.",
        "By using our services, you consent to this transfer of information.",
      ],
    },
    {
      heading: "12. Your Rights",
      paragraphs: [
        "Depending on your location, you may have the right to:",
      ],
      list: [
        "Access your personal data",
        "Correct inaccurate data",
        "Request deletion",
        "Object to processing",
        "Withdraw consent",
        "Request a copy of your data",
      ],
    },
    {
      heading: "13. Children's Privacy",
      paragraphs: [
        "Our services are not directed toward children without parental supervision.",
        "We do not knowingly collect personal information from children without consent.",
        "If you believe a child has provided personal data, please contact us.",
      ],
    },
    {
      heading: "14. Updates to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.",
      ],
    },
    {
      heading: "15. Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy, you may contact us:",
      ],
      list: [
        "The Shrub Lodge",
        "Victoria Falls, Zimbabwe",
        "Email: reservations@theshrublodge.com",
        "Phone: +263 788 746 909",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  updated: "03/03/2026",
  sections: [
    {
      heading: "1. Introduction",
      paragraphs: [
        "Welcome to The Shrub Lodge website. These Terms and Conditions govern your use of our website and services.",
        "By accessing or using this website, making a booking, or using any of our services, you agree to be bound by these Terms and Conditions.",
        "If you do not agree with any part of these terms, please do not use our website or services.",
      ],
    },
    {
      heading: "2. About The Shrub Lodge",
      paragraphs: [
        "The Shrub Lodge is a hospitality establishment offering accommodation and travel experiences in Victoria Falls, Zimbabwe.",
        "Contact Information:",
      ],
      list: [
        "The Shrub Lodge",
        "Victoria Falls, Zimbabwe",
        "Email: reservations@theshrublodge.com",
        "Phone: +263 788 746 909",
      ],
    },
    {
      heading: "3. Use of the Website",
      paragraphs: ["By using this website, you agree:"],
      list: [
        "To use the website for lawful purposes only",
        "Not to misuse or interfere with the website",
        "Not to attempt unauthorized access to systems",
        "Not to use the website for fraudulent bookings",
        "To provide accurate information when making inquiries or bookings",
        "We reserve the right to restrict or terminate access if misuse is detected.",
      ],
    },
    {
      heading: "4. Bookings",
      paragraphs: ["Bookings made through the website are considered requests and are only confirmed once you receive written confirmation from The Shrub Lodge."],
    },
    {
      heading: "4.1 Booking Information",
      paragraphs: ["You agree to provide accurate details including:"],
      list: [
        "Full name",
        "Contact information",
        "Travel dates",
        "Number of guests",
        "Special requests",
        "Incorrect information may result in booking cancellation.",
      ],
    },
    {
      heading: "5. Payments",
      paragraphs: ["A deposit may be required to secure your booking. Bookings are not confirmed until payment is received."],
    },
    {
      heading: "5.1 Payment Methods",
      paragraphs: ["We may accept payments via:"],
      list: [
        "Bank transfer",
        "Card payments",
        "Online payment platforms",
        "Cash payments (where applicable)",
        "Payment instructions will be provided after booking confirmation.",
      ],
    },
    {
      heading: "5.2 Outstanding Balances",
      paragraphs: [
        "Full payment may be required before arrival. Failure to complete payment may result in cancellation.",
      ],
    },
    {
      heading: "6. Pricing",
      paragraphs: [
        "All prices are quoted in USD unless otherwise stated. Prices may change without notice but confirmed bookings will not be affected.",
        "Prices may include:",
      ],
      list: ["Accommodation", "Selected amenities"],
    },
    {
      heading: "Prices typically exclude:",
      list: [
        "Activities",
        "Transfers",
        "Meals (unless specified)",
        "Park fees",
        "Personal expenses",
      ],
    },
    {
      heading: "7. Cancellations",
      paragraphs: ["Cancellation policies will be communicated at the time of booking. Deposits may be:"],
      list: ["Non-refundable", "Partially refundable", "Transferable to another date"],
    },
    {
      heading: "7.1 No Shows",
      paragraphs: ["Failure to arrive without notice may result in full booking charges."],
    },
    {
      heading: "8. Changes to Bookings",
      paragraphs: [
        "We will do our best to accommodate booking changes, but changes are not guaranteed. Changes may include:",
      ],
      list: ["Date changes", "Room changes", "Guest number changes", "Additional charges may apply."],
    },
    {
      heading: "9. Check-In and Check-Out",
      paragraphs: [
        "Typical times are: Check-in from 2:00 PM and check-out by 10:00 AM.",
        "Early check-in or late check-out may be available upon request. Additional charges may apply.",
      ],
    },
    {
      heading: "10. Guest Responsibilities",
      paragraphs: ["Guests agree:"],
      list: [
        "To respect lodge property",
        "To respect other guests",
        "To follow lodge rules",
        "To supervise children",
        "To behave responsibly",
      ],
    },
    {
      heading: "The Shrub Lodge reserves the right to remove guests for:",
      list: ["Dangerous behavior", "Illegal activities", "Property damage", "Disturbances"],
    },
    {
      heading: "11. Damages",
      paragraphs: [
        "Guests are responsible for any damages caused during their stay. Charges may apply for:",
      ],
      list: ["Broken items", "Missing items", "Excessive cleaning", "Property damage"],
    },
    {
      heading: "12. Activities and Excursions",
      paragraphs: [
        "The Shrub Lodge may assist in arranging activities such as:",
      ],
      list: ["Safari tours", "River cruises", "Guided tours", "Adventure activities"],
    },
    {
      heading: "These activities may be operated by third parties. The Shrub Lodge is not responsible for:",
      list: [
        "Injuries",
        "Delays",
        "Weather disruptions",
        "Operator cancellations",
        "Losses during activities",
        "Guests participate at their own risk.",
      ],
    },
    {
      heading: "13. Travel Insurance",
      paragraphs: ["Guests are strongly encouraged to obtain travel insurance. Insurance should cover:"],
      list: ["Cancellations", "Medical expenses", "Activities", "Lost luggage", "Travel delays"],
    },
    {
      heading: "14. Liability",
      paragraphs: ["To the fullest extent permitted by law, The Shrub Lodge is not liable for:"],
      list: [
        "Loss of personal belongings",
        "Injuries",
        "Delays",
        "Travel disruptions",
        "Weather conditions",
        "Third-party services",
        "Theft or damage",
        "Guests are responsible for their personal belongings.",
      ],
    },
    {
      heading: "15. Force Majeure",
      paragraphs: [
        "We are not responsible for failure to provide services due to events beyond our control, including:",
      ],
      list: [
        "Natural disasters",
        "Floods",
        "Fires",
        "War",
        "Government restrictions",
        "Pandemics",
        "Power outages",
        "Transport disruptions",
        "Bookings may be rescheduled where possible.",
      ],
    },
    {
      heading: "16. Website Content",
      paragraphs: [
        "All content on this website is owned by The Shrub Lodge unless stated otherwise. This includes:",
      ],
      list: ["Images", "Text", "Logos", "Designs", "Content may not be copied or used without permission."],
    },
    {
      heading: "17. Privacy",
      paragraphs: ["Use of this website is also governed by our Privacy Policy."],
    },
    {
      heading: "18. Third-Party Links",
      paragraphs: [
        "Our website may include links to third-party websites. We are not responsible for their content or policies.",
      ],
    },
    {
      heading: "19. Changes to Terms",
      paragraphs: [
        "We reserve the right to update these Terms and Conditions at any time. Updates will be posted on this page.",
      ],
    },
    {
      heading: "20. Governing Law",
      paragraphs: [
        "These Terms and Conditions are governed by the laws of Zimbabwe. Any disputes shall be handled in Zimbabwe.",
      ],
    },
    {
      heading: "21. Contact Information",
      paragraphs: [
        "For any questions regarding these Terms and Conditions, please contact:",
      ],
      list: [
        "The Shrub Lodge",
        "Victoria Falls, Zimbabwe",
        "Email: reservations@theshrublodge.com",
        "Phone: +263 788 746 909",
      ],
    },
  ],
};
