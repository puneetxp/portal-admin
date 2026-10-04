export interface Booking {
  id: string;
  pnr: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  route: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  busPlate: string;
  busCategory: "Luxury (Gold Class)" | "Executive" | "Economy";
  seats: string[];
  operator: string;
  status: "CONFIRMED" | "BOARDED" | "MODIFIED" | "CANCELLED" | "PENDING_PAYMENT";
  amount: number;
  paymentMethod: "Credit Card" | "Bank Transfer" | "Cash" | "Wallet";
  source: "Web App" | "Mobile App" | "Admin UI";
}

export interface Bus {
  id: string;
  plateNumber: string;
  operator: string;
  category: "Luxury (Gold Class)" | "Executive" | "Economy";
  capacity: number;
  status: "Active" | "Disabled" | "Maintenance";
  year: number;
  amenities: string[];
  lastInspection: string;
}

export interface Trip {
  id: string;
  tripCode: string;
  busPlate: string;
  operator: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  frequency: "Daily" | "Mon, Wed, Fri" | "Weekends" | "Daily Express";
  price: number;
  type: "Regular" | "Exclusive";
  seatsAvailable: number;
  totalSeats: number;
  status: "Scheduled" | "On Route" | "Completed" | "Delayed";
}

export interface City {
  id: string;
  name: string;
  country: "Saudi Arabia" | "UAE" | "Oman";
  stationsCount: number;
  status: "Operational" | "Expanding" | "Planned";
  routesCount: number;
  mainHub: string;
}

export interface Package {
  id: string;
  code: string;
  title: string;
  operator: string;
  category: "Economy Travel" | "VIP Luxury" | "Family Package" | "Cargo / Freight";
  origin: string;
  destination: string;
  durationDays: number;
  price: number;
  status: "Active" | "Draft" | "Archived";
  repetition: "Weekly" | "Daily" | "Custom";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  totalBookings: number;
  walletBalance: number;
  status: "Active" | "Suspended" | "Pending KYC";
  lastActive: string;
  joinedDate: string;
  loyaltyTier: "Gold VIP" | "Silver" | "Standard";
}

export interface PaymentVerification {
  id: string;
  pnr: string;
  customerName: string;
  amount: number;
  method: "Bank Transfer" | "Cash Deposit";
  referenceNumber: string;
  bankName?: string;
  submissionDate: string;
  status: "Pending" | "Verified" | "Rejected";
  receiptUrl?: string;
  notes?: string;
}

export interface RefundRequest {
  id: string;
  requestId: string;
  customerName: string;
  customerPhone: string;
  pnr: string;
  amount: number;
  method: "Original Card" | "Wallet Credit" | "Bank Wire";
  reason: string;
  requestDate: string;
  status: "Pending Approval" | "Approved" | "Rejected";
}

export interface Transaction {
  id: string;
  ref: string;
  date: string;
  customerOrOperator: string;
  type: "Booking Payment" | "Operator Payout" | "Refund" | "Commission Fee" | "Wallet Topup";
  method: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
}

export interface OperatorPayout {
  id: string;
  operatorName: string;
  cycle: string;
  totalTrips: number;
  grossFare: number;
  commission: number;
  netPayout: number;
  bankAccount: string;
  status: "Paid" | "Approved" | "Pending Review";
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: "Percentage" | "Fixed";
  value: number;
  maxDiscount?: number;
  minSpend?: number;
  totalRedemptions: number;
  validUntil: string;
  status: "Active" | "Expired" | "Disabled";
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  adminName: string;
  role: string;
  action: string;
  entity: string;
  ipAddress: string;
  details: string;
}

// Initial Mock Datasets
export const initialBookings: Booking[] = [
  {
    id: "b1",
    pnr: "BA-98214",
    customerName: "Ahmed Mohammed Al-Fassi",
    customerEmail: "ahmed.fassi@company.sa",
    customerPhone: "+966 50 123 4567",
    route: "Riyadh → Dammam",
    origin: "Riyadh",
    destination: "Dammam",
    departureTime: "08:30 AM",
    arrivalTime: "12:45 PM",
    date: "2024-10-15",
    busPlate: "KSA 1285",
    busCategory: "Luxury (Gold Class)",
    seats: ["12A", "12B"],
    operator: "Arabian Sands Transit",
    status: "BOARDED",
    amount: 145,
    paymentMethod: "Credit Card",
    source: "Web App",
  },
  {
    id: "b2",
    pnr: "BA-98215",
    customerName: "Sarah Khan",
    customerEmail: "sarah.k@gmail.com",
    customerPhone: "+966 55 987 6543",
    route: "Jeddah → Mecca",
    origin: "Jeddah",
    destination: "Mecca",
    departureTime: "10:15 AM",
    arrivalTime: "11:30 AM",
    date: "2024-10-15",
    busPlate: "KSA 4492",
    busCategory: "Executive",
    seats: ["04C"],
    operator: "Haramain Express Lines",
    status: "CONFIRMED",
    amount: 85,
    paymentMethod: "Wallet",
    source: "Admin UI",
  },
  {
    id: "b3",
    pnr: "BA-98216",
    customerName: "Tariq Mansoor",
    customerEmail: "tariq.m@outlook.com",
    customerPhone: "+971 50 445 2211",
    route: "Dubai → Riyadh",
    origin: "Dubai",
    destination: "Riyadh",
    departureTime: "06:00 PM",
    arrivalTime: "04:30 AM",
    date: "2024-10-16",
    busPlate: "DXB 9912",
    busCategory: "Luxury (Gold Class)",
    seats: ["01A"],
    operator: "Gulf Intercity Coaches",
    status: "CONFIRMED",
    amount: 450,
    paymentMethod: "Credit Card",
    source: "Mobile App",
  },
  {
    id: "b4",
    pnr: "BA-98217",
    customerName: "Fatima Zahra",
    customerEmail: "fatima.z@domain.com",
    customerPhone: "+966 54 888 1234",
    route: "Medina → Jeddah",
    origin: "Medina",
    destination: "Jeddah",
    departureTime: "02:00 PM",
    arrivalTime: "06:30 PM",
    date: "2024-10-15",
    busPlate: "KSA 7710",
    busCategory: "Executive",
    seats: ["08A", "08B"],
    operator: "Arabian Sands Transit",
    status: "MODIFIED",
    amount: 190,
    paymentMethod: "Bank Transfer",
    source: "Web App",
  },
  {
    id: "b5",
    pnr: "BA-98218",
    customerName: "Omar Qureshi",
    customerEmail: "omar.q@holding.com",
    customerPhone: "+966 56 333 9900",
    route: "Dammam → Bahrain Causeway",
    origin: "Dammam",
    destination: "Manama",
    departureTime: "09:00 AM",
    arrivalTime: "10:30 AM",
    date: "2024-10-14",
    busPlate: "KSA 3311",
    busCategory: "Economy",
    seats: ["15D"],
    operator: "Causeway Link",
    status: "CANCELLED",
    amount: 65,
    paymentMethod: "Cash",
    source: "Admin UI",
  },
  {
    id: "b6",
    pnr: "BA-98219",
    customerName: "Noor Al-Otaibi",
    customerEmail: "noor.otaibi@saudi.net",
    customerPhone: "+966 50 777 6655",
    route: "Riyadh → Abha",
    origin: "Riyadh",
    destination: "Abha",
    departureTime: "11:00 PM",
    arrivalTime: "08:30 AM",
    date: "2024-10-17",
    busPlate: "KSA 8820",
    busCategory: "Luxury (Gold Class)",
    seats: ["02B"],
    operator: "Asir Royal Transport",
    status: "PENDING_PAYMENT",
    amount: 280,
    paymentMethod: "Bank Transfer",
    source: "Web App",
  },
];

export const initialBuses: Bus[] = [
  {
    id: "bus-1",
    plateNumber: "KSA 1285",
    operator: "Arabian Sands Transit",
    category: "Luxury (Gold Class)",
    capacity: 45,
    status: "Active",
    year: 2023,
    amenities: ["Free High-Speed Wi-Fi", "Reclining Leather Seats", "USB-C Outlets", "Onboard Restroom", "Complimentary Refreshments"],
    lastInspection: "2024-09-18",
  },
  {
    id: "bus-2",
    plateNumber: "KSA 4492",
    operator: "Haramain Express Lines",
    category: "Executive",
    capacity: 49,
    status: "Active",
    year: 2022,
    amenities: ["Air Conditioning", "USB Charging", "Reading Lights", "Luggage Storage"],
    lastInspection: "2024-08-30",
  },
  {
    id: "bus-3",
    plateNumber: "DXB 9912",
    operator: "Gulf Intercity Coaches",
    category: "Luxury (Gold Class)",
    capacity: 38,
    status: "Active",
    year: 2024,
    amenities: ["First-Class Pods", "Starlink Wi-Fi", "Personal Entertainment Screens", "Hot Meals Service", "Restroom"],
    lastInspection: "2024-10-01",
  },
  {
    id: "bus-4",
    plateNumber: "KSA 7710",
    operator: "Arabian Sands Transit",
    category: "Executive",
    capacity: 52,
    status: "Active",
    year: 2021,
    amenities: ["Air Conditioning", "Audio Entertainment", "Reclining Seats"],
    lastInspection: "2024-09-02",
  },
  {
    id: "bus-5",
    plateNumber: "KSA 3311",
    operator: "Causeway Link",
    category: "Economy",
    capacity: 55,
    status: "Disabled",
    year: 2019,
    amenities: ["Standard AC", "Under-chassis Luggage"],
    lastInspection: "2024-07-15",
  },
  {
    id: "bus-6",
    plateNumber: "KSA 8820",
    operator: "Asir Royal Transport",
    category: "Luxury (Gold Class)",
    capacity: 42,
    status: "Active",
    year: 2023,
    amenities: ["Wi-Fi", "Wide Leather Seats", "Power Sockets", "Restroom", "Refreshments"],
    lastInspection: "2024-09-25",
  },
];

export const initialTrips: Trip[] = [
  {
    id: "t1",
    tripCode: "3124xDJa",
    busPlate: "KSA 1285",
    operator: "Arabian Sands Transit",
    origin: "Riyadh",
    destination: "Dammam",
    departureTime: "08:30 AM",
    arrivalTime: "12:45 PM",
    frequency: "Daily Express",
    price: 145,
    type: "Regular",
    seatsAvailable: 14,
    totalSeats: 45,
    status: "On Route",
  },
  {
    id: "t2",
    tripCode: "4920kMka",
    busPlate: "KSA 4492",
    operator: "Haramain Express Lines",
    origin: "Jeddah",
    destination: "Mecca",
    departureTime: "10:15 AM",
    arrivalTime: "11:30 AM",
    frequency: "Daily",
    price: 85,
    type: "Regular",
    seatsAvailable: 22,
    totalSeats: 49,
    status: "Scheduled",
  },
  {
    id: "t3",
    tripCode: "9912gDXB",
    busPlate: "DXB 9912",
    operator: "Gulf Intercity Coaches",
    origin: "Dubai",
    destination: "Riyadh",
    departureTime: "06:00 PM",
    arrivalTime: "04:30 AM",
    frequency: "Mon, Wed, Fri",
    price: 450,
    type: "Exclusive",
    seatsAvailable: 6,
    totalSeats: 38,
    status: "Scheduled",
  },
  {
    id: "t4",
    tripCode: "7710mJED",
    busPlate: "KSA 7710",
    operator: "Arabian Sands Transit",
    origin: "Medina",
    destination: "Jeddah",
    departureTime: "02:00 PM",
    arrivalTime: "06:30 PM",
    frequency: "Daily",
    price: 190,
    type: "Regular",
    seatsAvailable: 0,
    totalSeats: 52,
    status: "Scheduled",
  },
];

export const initialCities: City[] = [
  {
    id: "c1",
    name: "Riyadh",
    country: "Saudi Arabia",
    stationsCount: 8,
    status: "Operational",
    routesCount: 42,
    mainHub: "King Abdullah Financial District Hub",
  },
  {
    id: "c2",
    name: "Jeddah",
    country: "Saudi Arabia",
    stationsCount: 12,
    status: "Operational",
    routesCount: 38,
    mainHub: "Al-Balad Central Intermodal Terminal",
  },
  {
    id: "c3",
    name: "Dammam",
    country: "Saudi Arabia",
    stationsCount: 6,
    status: "Operational",
    routesCount: 24,
    mainHub: "Eastern Province Gateway Station",
  },
  {
    id: "c4",
    name: "Mecca",
    country: "Saudi Arabia",
    stationsCount: 14,
    status: "Operational",
    routesCount: 50,
    mainHub: "Haram Central Station",
  },
  {
    id: "c5",
    name: "Medina",
    country: "Saudi Arabia",
    stationsCount: 9,
    status: "Operational",
    routesCount: 32,
    mainHub: "Al Madinah Knowledge Economic Station",
  },
  {
    id: "c6",
    name: "Dubai",
    country: "UAE",
    stationsCount: 5,
    status: "Operational",
    routesCount: 16,
    mainHub: "Al Ghubaiba International Bus Station",
  },
  {
    id: "c7",
    name: "Muscat",
    country: "Oman",
    stationsCount: 4,
    status: "Expanding",
    routesCount: 8,
    mainHub: "Ruwi Transit Terminal",
  },
];

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Ahmed Mohammed Al-Fassi",
    email: "ahmed.fassi@company.sa",
    phone: "+966 50 123 4567",
    nationality: "Saudi Arabia",
    totalBookings: 28,
    walletBalance: 840,
    status: "Active",
    lastActive: "Today at 09:14 AM",
    joinedDate: "2023-04-12",
    loyaltyTier: "Gold VIP",
  },
  {
    id: "cust-2",
    name: "Sarah Khan",
    email: "sarah.k@gmail.com",
    phone: "+966 55 987 6543",
    nationality: "Pakistan",
    totalBookings: 14,
    walletBalance: 120,
    status: "Active",
    lastActive: "Yesterday",
    joinedDate: "2023-09-01",
    loyaltyTier: "Silver",
  },
  {
    id: "cust-3",
    name: "Tariq Mansoor",
    email: "tariq.m@outlook.com",
    phone: "+971 50 445 2211",
    nationality: "UAE",
    totalBookings: 35,
    walletBalance: 2450,
    status: "Active",
    lastActive: "2 hours ago",
    joinedDate: "2022-11-15",
    loyaltyTier: "Gold VIP",
  },
  {
    id: "cust-4",
    name: "Khaled Bin Sultan",
    email: "khaled.sultan@domain.com",
    phone: "+966 50 000 1122",
    nationality: "Saudi Arabia",
    totalBookings: 2,
    walletBalance: 0,
    status: "Suspended",
    lastActive: "14 days ago",
    joinedDate: "2024-08-20",
    loyaltyTier: "Standard",
  },
];

export const initialPaymentVerifications: PaymentVerification[] = [
  {
    id: "pv-1",
    pnr: "BA-98216",
    customerName: "Noor Al-Otaibi",
    amount: 280,
    method: "Bank Transfer",
    referenceNumber: "ALRAJHI-9081249",
    bankName: "Al Rajhi Bank",
    submissionDate: "Today at 10:45 AM",
    status: "Pending",
    receiptUrl: "/receipts/sample_slip.png",
    notes: "Passenger uploaded counterfoil slip via mobile app",
  },
  {
    id: "pv-2",
    pnr: "BA-98214",
    customerName: "Fatima Zahra",
    amount: 190,
    method: "Bank Transfer",
    referenceNumber: "SNB-8830192",
    bankName: "Saudi National Bank (SNB)",
    submissionDate: "Today at 08:30 AM",
    status: "Pending",
    receiptUrl: "/receipts/sample_slip2.png",
    notes: "Ref matched reservation #BA-98217",
  },
  {
    id: "pv-3",
    pnr: "BA-98102",
    customerName: "Mohsen Al-Ghamdi",
    amount: 540,
    method: "Cash Deposit",
    referenceNumber: "CASH-STATION-RYD-04",
    submissionDate: "Yesterday",
    status: "Verified",
    notes: "Verified by Station Agent Ibrahim at Riyadh KAFD",
  },
  {
    id: "pv-4",
    pnr: "BA-97994",
    customerName: "Zaid Al-Harbi",
    amount: 145,
    method: "Bank Transfer",
    referenceNumber: "RIYAD-11029",
    bankName: "Riyad Bank",
    submissionDate: "2 days ago",
    status: "Rejected",
    notes: "Slip unreadable / amount mismatch",
  },
];

export const initialRefundRequests: RefundRequest[] = [
  {
    id: "rf-1",
    requestId: "REF-2024-8841",
    customerName: "Omar Qureshi",
    customerPhone: "+966 56 333 9900",
    pnr: "BA-98218",
    amount: 65,
    method: "Wallet Credit",
    reason: "Bus trip cancelled due to sandstorm warning",
    requestDate: "Oct 14, 2024",
    status: "Pending Approval",
  },
  {
    id: "rf-2",
    requestId: "REF-2024-8840",
    customerName: "Laila Haddad",
    customerPhone: "+966 54 222 9988",
    pnr: "BA-97554",
    amount: 320,
    method: "Original Card",
    reason: "Duplicate booking by user error",
    requestDate: "Oct 13, 2024",
    status: "Pending Approval",
  },
  {
    id: "rf-3",
    requestId: "REF-2024-8835",
    customerName: "Ibrahim Yousef",
    customerPhone: "+966 50 111 8844",
    pnr: "BA-96890",
    amount: 145,
    method: "Wallet Credit",
    reason: "Medical emergency prior to departure",
    requestDate: "Oct 11, 2024",
    status: "Approved",
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    ref: "TX-90241-BA",
    date: "2024-10-15 10:45 AM",
    customerOrOperator: "Ahmed Mohammed Al-Fassi",
    type: "Booking Payment",
    method: "Visa •••• 4242",
    amount: 145,
    status: "Success",
  },
  {
    id: "tx-2",
    ref: "TX-90240-BA",
    date: "2024-10-15 09:30 AM",
    customerOrOperator: "Arabian Sands Transit",
    type: "Commission Fee",
    method: "System Auto-Deduct (7.5%)",
    amount: 10.88,
    status: "Success",
  },
  {
    id: "tx-3",
    ref: "TX-90239-BA",
    date: "2024-10-15 08:15 AM",
    customerOrOperator: "Noor Al-Otaibi",
    type: "Booking Payment",
    method: "Bank Wire (Al Rajhi)",
    amount: 280,
    status: "Pending",
  },
  {
    id: "tx-4",
    ref: "TX-90238-BA",
    date: "2024-10-14 05:20 PM",
    customerOrOperator: "Haramain Express Lines",
    type: "Operator Payout",
    method: "ACH Direct Settlement",
    amount: 45200,
    status: "Success",
  },
  {
    id: "tx-5",
    ref: "TX-90237-BA",
    date: "2024-10-14 02:10 PM",
    customerOrOperator: "Ibrahim Yousef",
    type: "Refund",
    method: "Internal Wallet",
    amount: -145,
    status: "Success",
  },
];

export const initialOperatorPayouts: OperatorPayout[] = [
  {
    id: "pay-1",
    operatorName: "Arabian Sands Transit",
    cycle: "Cycle 24-B (Oct 01 - Oct 15)",
    totalTrips: 412,
    grossFare: 618400,
    commission: 46380,
    netPayout: 572020,
    bankAccount: "SA84 8000 0201 4492 8810",
    status: "Approved",
  },
  {
    id: "pay-2",
    operatorName: "Haramain Express Lines",
    cycle: "Cycle 24-B (Oct 01 - Oct 15)",
    totalTrips: 285,
    grossFare: 342000,
    commission: 25650,
    netPayout: 316350,
    bankAccount: "SA12 1000 0001 9928 3341",
    status: "Approved",
  },
  {
    id: "pay-3",
    operatorName: "Gulf Intercity Coaches",
    cycle: "Cycle 24-B (Oct 01 - Oct 15)",
    totalTrips: 110,
    grossFare: 215000,
    commission: 16125,
    netPayout: 198875,
    bankAccount: "AE44 0330 0000 1289 4400",
    status: "Pending Review",
  },
  {
    id: "pay-4",
    operatorName: "Asir Royal Transport",
    cycle: "Cycle 24-B (Oct 01 - Oct 15)",
    totalTrips: 94,
    grossFare: 168400,
    commission: 12630,
    netPayout: 155770,
    bankAccount: "SA55 4000 0300 8812 7700",
    status: "Paid",
  },
];

export const initialPromoCodes: PromoCode[] = [
  {
    id: "pr-1",
    code: "EID2024",
    discountType: "Percentage",
    value: 20,
    maxDiscount: 100,
    minSpend: 200,
    totalRedemptions: 1840,
    validUntil: "2024-12-31",
    status: "Active",
  },
  {
    id: "pr-2",
    code: "DESERTLUXURY",
    discountType: "Fixed",
    value: 50,
    minSpend: 300,
    totalRedemptions: 924,
    validUntil: "2024-11-30",
    status: "Active",
  },
  {
    id: "pr-3",
    code: "SUMMERESCAPE",
    discountType: "Percentage",
    value: 15,
    totalRedemptions: 3410,
    validUntil: "2024-09-30",
    status: "Expired",
  },
];

export const initialAuditEntries: AuditEntry[] = [
  {
    id: "aud-1",
    timestamp: "2024-10-15 11:32:04",
    adminName: "SuperAdmin (Waseem)",
    role: "Global Administrator",
    action: "VERIFY_PAYMENT",
    entity: "Payment Verification #pv-3",
    ipAddress: "192.168.1.104",
    details: "Approved cash deposit proof for PNR #BA-98102 (540 SAR)",
  },
  {
    id: "aud-2",
    timestamp: "2024-10-15 10:14:22",
    adminName: "OperationsLead (Sarah)",
    role: "Dispatcher Admin",
    action: "UPDATE_TRIP_STATUS",
    entity: "Trip #3124xDJa",
    ipAddress: "192.168.1.112",
    details: "Changed status from Scheduled to On Route at Riyadh Station",
  },
  {
    id: "aud-3",
    timestamp: "2024-10-15 09:05:18",
    adminName: "FinanceManager (Tariq)",
    role: "Finance Admin",
    action: "APPROVE_PAYOUT_BATCH",
    entity: "Operator Payout #pay-1",
    ipAddress: "10.0.4.15",
    details: "Approved Cycle 24-B settlement for Arabian Sands Transit (572,020 SAR)",
  },
  {
    id: "aud-4",
    timestamp: "2024-10-14 16:40:55",
    adminName: "SuperAdmin (Waseem)",
    role: "Global Administrator",
    action: "UPDATE_POLICY",
    entity: "Platform Settings",
    ipAddress: "192.168.1.104",
    details: "Set Standard Cancellation Fee to 10% and Late Cancellation to 50%",
  },
];

// ==========================================
// OPERATOR PORTAL SPECIFIC TYPES & DATASETS
// ==========================================

export interface OperatorProfile {
  companyName: string;
  operatorId: string;
  verified: boolean;
  complianceStatus: "High Confidence" | "Standard" | "Under Review";
  lastKycAudit: string;
  monthlyPayouts: string;
  commercialRegistration: string;
  crExpiryDate: string;
  transportLicense: string;
  taxRegistrationNumber: string;
  companyDescription: string;
  contactPerson: string;
  corporateEmail: string;
  verifiedMobile: string;
  alternateContact: string;
  officeAddress: string;
  operatingCities: string[];
  primaryRoutes: { route: string; tripsPerWeek: number; status: string }[];
  bankName: string;
  accountName: string;
  ibanNumber: string;
  swiftCode: string;
  supportHotline: string;
  supportEmail: string;
  whatsappSupport: string;
  averageResponseTime: string;
}

export const mockOperatorProfile: OperatorProfile = {
  companyName: "Arabia Fleet Services LLC",
  operatorId: "OPS-8842-DXB",
  verified: true,
  complianceStatus: "High Confidence",
  lastKycAudit: "Oct 2023",
  monthlyPayouts: "SAR 1.2M",
  commercialRegistration: "CR-10293847-B",
  crExpiryDate: "12/05/2025",
  transportLicense: "TL-DXB-2024-001",
  taxRegistrationNumber: "100344556677889",
  companyDescription: "Premium bus transportation services specializing in corporate shuttle solutions and inter-city travel across the UAE and Saudi Arabia.",
  contactPerson: "Ahmed Al-Farsi",
  corporateEmail: "admin@arabiafleet.ae",
  verifiedMobile: "+971 50 123 4567",
  alternateContact: "+971 4 888 0000",
  officeAddress: "Business Bay, Aspect Tower, Level 24, Office 2402, Dubai, UAE",
  operatingCities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Riyadh", "Jeddah"],
  primaryRoutes: [
    { route: "Dubai → Abu Dhabi Express", tripsPerWeek: 42, status: "Active" },
    { route: "Dubai → Sharjah Rapid Link", tripsPerWeek: 56, status: "Active" },
    { route: "Riyadh → Dammam Intercity", tripsPerWeek: 28, status: "Active" },
    { route: "Jeddah → Mecca VIP Line", tripsPerWeek: 35, status: "Active" },
  ],
  bankName: "Emirates NBD",
  accountName: "Arabia Fleet Services LLC",
  ibanNumber: "AE03 0000 1234 5678 9012 345",
  swiftCode: "EBIBAEADXXX",
  supportHotline: "+971 800 287 2722",
  supportEmail: "support@arabiafleet.ae",
  whatsappSupport: "+971 50 999 8877",
  averageResponseTime: "12 Mins",
};

export interface OperatorFleetBus {
  id: string;
  plateNumber: string;
  model: string;
  category: "LUXURY ELITE" | "EXECUTIVE PLUS" | "STANDARD";
  capacity: number;
  config: string;
  utilizationRate: number;
  amenities: {
    wifi: boolean;
    climate: boolean;
    usb: boolean;
    screen: boolean;
    restroom: boolean;
    extraLegroom: boolean;
  };
  status: "Active" | "Maintenance" | "Offline";
  seatSelectionEnabled: boolean;
  nextInspection: string;
  driverAssigned?: string;
}

export const mockOperatorBuses: OperatorFleetBus[] = [
  {
    id: "bus-101",
    plateNumber: "KSA-8821-V",
    model: "Volvo 9700 Grand",
    category: "LUXURY ELITE",
    capacity: 42,
    config: "2+1 Config",
    utilizationRate: 85,
    amenities: { wifi: true, climate: true, usb: true, screen: true, restroom: true, extraLegroom: true },
    status: "Active",
    seatSelectionEnabled: true,
    nextInspection: "15 Nov 2024",
    driverAssigned: "Rashid Al-Nuaimi",
  },
  {
    id: "bus-102",
    plateNumber: "UAE-1024-B",
    model: "Mercedes Benz Tourismo",
    category: "EXECUTIVE PLUS",
    capacity: 50,
    config: "2+2 Config",
    utilizationRate: 92,
    amenities: { wifi: true, climate: true, usb: true, screen: false, restroom: true, extraLegroom: true },
    status: "Active",
    seatSelectionEnabled: true,
    nextInspection: "20 Nov 2024",
    driverAssigned: "Tariq Bin Ziyad",
  },
  {
    id: "bus-103",
    plateNumber: "KSA-5512-R",
    model: "MAN Lion's Coach",
    category: "LUXURY ELITE",
    capacity: 38,
    config: "1+2 VIP",
    utilizationRate: 78,
    amenities: { wifi: true, climate: true, usb: true, screen: true, restroom: true, extraLegroom: true },
    status: "Active",
    seatSelectionEnabled: true,
    nextInspection: "04 Dec 2024",
    driverAssigned: "Karim Mostafa",
  },
  {
    id: "bus-104",
    plateNumber: "UAE-3390-X",
    model: "Scania Touring HD",
    category: "STANDARD",
    capacity: 55,
    config: "2+2 Standard",
    utilizationRate: 64,
    amenities: { wifi: false, climate: true, usb: true, screen: false, restroom: false, extraLegroom: false },
    status: "Maintenance",
    seatSelectionEnabled: false,
    nextInspection: "Overdue (Brake Pads)",
    driverAssigned: "Pending Workshop",
  },
  {
    id: "bus-105",
    plateNumber: "KSA-9941-T",
    model: "Mercedes Benz Travego",
    category: "LUXURY ELITE",
    capacity: 40,
    config: "Platinum Plus",
    utilizationRate: 89,
    amenities: { wifi: true, climate: true, usb: true, screen: true, restroom: true, extraLegroom: true },
    status: "Active",
    seatSelectionEnabled: true,
    nextInspection: "28 Nov 2024",
    driverAssigned: "Ibrahim Salem",
  },
];

export interface OperatorRouteItem {
  id: string;
  code: string;
  origin: string;
  originTerminal: string;
  destination: string;
  destinationTerminal: string;
  stopsCount: number;
  stopsList: string[];
  duration: string;
  distanceKm: number;
  serviceLevel: "VIP Luxury" | "Executive Plus" | "Standard Shuttle";
  status: "Active" | "Inactive";
  weeklyTrips: number;
  onTimePerformance: string;
  avgOccupancy: string;
}

export const mockOperatorRoutes: OperatorRouteItem[] = [
  {
    id: "r-1",
    code: "R-8821",
    origin: "Riyadh",
    originTerminal: "Olaya Hub Terminal",
    destination: "Jeddah",
    destinationTerminal: "Corniche West Hub",
    stopsCount: 2,
    stopsList: ["Al-Quway'iyah Station", "Taif Gateway Point"],
    duration: "9h 15m",
    distanceKm: 950,
    serviceLevel: "VIP Luxury",
    status: "Active",
    weeklyTrips: 28,
    onTimePerformance: "98.4%",
    avgOccupancy: "94%",
  },
  {
    id: "r-2",
    code: "R-8822",
    origin: "Riyadh Central",
    originTerminal: "KAFD Terminal Gate 3",
    destination: "Dammam Seaside",
    destinationTerminal: "Eastern Gateway Terminal",
    stopsCount: 1,
    stopsList: ["Al Hofuf Express Stop"],
    duration: "4h 30m",
    distanceKm: 410,
    serviceLevel: "Executive Plus",
    status: "Active",
    weeklyTrips: 35,
    onTimePerformance: "99.1%",
    avgOccupancy: "88%",
  },
  {
    id: "r-3",
    code: "R-8823",
    origin: "Dubai",
    originTerminal: "Al Ghubaiba Intercity Bay",
    destination: "Abu Dhabi",
    destinationTerminal: "Central Bus Terminal Platform 2",
    stopsCount: 0,
    stopsList: ["Direct Non-stop"],
    duration: "1h 45m",
    distanceKm: 140,
    serviceLevel: "VIP Luxury",
    status: "Active",
    weeklyTrips: 42,
    onTimePerformance: "97.5%",
    avgOccupancy: "91%",
  },
  {
    id: "r-4",
    code: "R-8824",
    origin: "Medina",
    originTerminal: "Knowledge Hub Station",
    destination: "Mecca",
    destinationTerminal: "Haram Central Terminal",
    stopsCount: 1,
    stopsList: ["Jeddah Airport Transfer"],
    duration: "4h 10m",
    distanceKm: 440,
    serviceLevel: "VIP Luxury",
    status: "Active",
    weeklyTrips: 21,
    onTimePerformance: "96.8%",
    avgOccupancy: "96%",
  },
];

export interface OperatorTripDetail {
  id: string;
  tripNumber: string;
  tripType: "Single Trip" | "Recurring Trip";
  routeCode: string;
  origin: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  busPlate: string;
  busModel: string;
  category: "LUXURY ELITE" | "EXECUTIVE PLUS" | "STANDARD";
  fare: number;
  currency: string;
  allocatedSeats: number;
  totalSeats: number;
  reservedSeats: number;
  status: "Active / Published" | "Draft" | "In-Transit" | "Completed" | "Cancelled";
  seatSelection: boolean;
  amenities: string[];
}

export const mockOperatorTrips: OperatorTripDetail[] = [
  {
    id: "trp-1",
    tripNumber: "#TRP-8821",
    tripType: "Single Trip",
    routeCode: "R-8822",
    origin: "Riyadh Central",
    destination: "Dammam Express",
    departureTime: "09:00 AM",
    departureDate: "Oct 24, 2023",
    arrivalTime: "01:30 PM",
    busPlate: "KSA-8821-V",
    busModel: "Mercedes Benz Tourismo (Executive)",
    category: "EXECUTIVE PLUS",
    fare: 150.00,
    currency: "SAR",
    allocatedSeats: 45,
    totalSeats: 50,
    reservedSeats: 5,
    status: "Active / Published",
    seatSelection: true,
    amenities: ["Free Wi-Fi", "Climate Control", "Extra Legroom", "USB Charging"],
  },
  {
    id: "trp-2",
    tripNumber: "#BA-9921",
    tripType: "Single Trip",
    routeCode: "R-8821",
    origin: "Cairo",
    destination: "Alexandria",
    departureTime: "08:30 AM",
    departureDate: "Oct 26, 2023",
    arrivalTime: "11:30 AM",
    busPlate: "KSA-1024-B",
    busModel: "Volvo 9700 Grand",
    category: "LUXURY ELITE",
    fare: 240.00,
    currency: "EGP",
    allocatedSeats: 42,
    totalSeats: 42,
    reservedSeats: 0,
    status: "Active / Published",
    seatSelection: true,
    amenities: ["Free Wi-Fi", "Climate Control", "Restroom", "In-seat Entertainment"],
  },
  {
    id: "trp-3",
    tripNumber: "#TRP-7740",
    tripType: "Recurring Trip",
    routeCode: "R-8823",
    origin: "Dubai",
    destination: "Abu Dhabi",
    departureTime: "06:30 PM",
    departureDate: "Daily",
    arrivalTime: "08:15 PM",
    busPlate: "UAE-9941-T",
    busModel: "Royal Mercedes Travego",
    category: "LUXURY ELITE",
    fare: 85.00,
    currency: "AED",
    allocatedSeats: 38,
    totalSeats: 40,
    reservedSeats: 2,
    status: "Active / Published",
    seatSelection: true,
    amenities: ["High-speed Wi-Fi", "Climate Control", "USB-C", "Refreshments"],
  },
  {
    id: "trp-4",
    tripNumber: "#TRP-5512",
    tripType: "Single Trip",
    routeCode: "R-8824",
    origin: "Medina",
    destination: "Mecca VIP",
    departureTime: "02:00 PM",
    departureDate: "Oct 27, 2023",
    arrivalTime: "06:10 PM",
    busPlate: "KSA-5512-R",
    busModel: "MAN Lion's Coach VIP",
    category: "LUXURY ELITE",
    fare: 180.00,
    currency: "SAR",
    allocatedSeats: 35,
    totalSeats: 38,
    reservedSeats: 3,
    status: "Draft",
    seatSelection: true,
    amenities: ["Free Wi-Fi", "Climate Control", "Restroom"],
  },
];

export interface PassengerManifestItem {
  id: string;
  bookingRef: string;
  seatNumber: string;
  passengerName: string;
  tier: string;
  contact: string;
  idType: "Iqama" | "Passport" | "Nat ID";
  idNumberMasked: string;
  status: "CONFIRMED" | "CANCELLED";
  boardingStatus: "Boarded" | "Mark Boarded" | "No-Show";
}

export const mockPassengerManifest: PassengerManifestItem[] = [
  {
    id: "pm-1",
    bookingRef: "#BK-9021A",
    seatNumber: "A-01",
    passengerName: "Ahmed Al-Farsi",
    tier: "Executive Tier Member",
    contact: "+20 102 345 6789",
    idType: "Iqama",
    idNumberMasked: "243****89",
    status: "CONFIRMED",
    boardingStatus: "Boarded",
  },
  {
    id: "pm-2",
    bookingRef: "#BK-8854B",
    seatNumber: "A-02",
    passengerName: "Layla Mansour",
    tier: "Standard Booking",
    contact: "+20 115 987 6543",
    idType: "Passport",
    idNumberMasked: "A92****12",
    status: "CONFIRMED",
    boardingStatus: "Mark Boarded",
  },
  {
    id: "pm-3",
    bookingRef: "#BK-7721X",
    seatNumber: "B-12",
    passengerName: "Zaid Khalifa",
    tier: "Travel Agency Ref",
    contact: "+20 109 123 4455",
    idType: "Nat ID",
    idNumberMasked: "290****01",
    status: "CONFIRMED",
    boardingStatus: "No-Show",
  },
  {
    id: "pm-4",
    bookingRef: "#BK-9122K",
    seatNumber: "B-14",
    passengerName: "Mariam Said",
    tier: "Standard Booking",
    contact: "+20 122 000 1122",
    idType: "Nat ID",
    idNumberMasked: "295****99",
    status: "CONFIRMED",
    boardingStatus: "Mark Boarded",
  },
  {
    id: "pm-5",
    bookingRef: "#BK-6640P",
    seatNumber: "C-05",
    passengerName: "Hassan Al-Baqir",
    tier: "Gold VIP Member",
    contact: "+966 50 443 2190",
    idType: "Nat ID",
    idNumberMasked: "108****44",
    status: "CONFIRMED",
    boardingStatus: "Boarded",
  },
  {
    id: "pm-6",
    bookingRef: "#BK-5521M",
    seatNumber: "C-06",
    passengerName: "Noura Al-Shehri",
    tier: "Executive Tier Member",
    contact: "+966 54 887 2311",
    idType: "Iqama",
    idNumberMasked: "231****55",
    status: "CONFIRMED",
    boardingStatus: "Mark Boarded",
  },
];

export interface OperationalRecoveryItem {
  id: string;
  bookingRef: string;
  channel: "MOBILE APP" | "WEB PORTAL" | "COUNTER" | "CORPORATE";
  customerName: string;
  customerPhone: string;
  origin: string;
  destination: string;
  tripDate: string;
  tripTime: string;
  cancellationDate: string;
  countdown: string;
  refundStatus: "FULL REFUND" | "PARTIAL (50%)" | "NO REFUND";
  seatsCount: number;
  payoutImpact: string;
  settlementStatus: "Processing" | "Settled" | "Operator Kept";
}

export const mockOperationalRecoveries: OperationalRecoveryItem[] = [
  {
    id: "rec-1",
    bookingRef: "BR-99021",
    channel: "MOBILE APP",
    customerName: "Ahmed Mansour",
    customerPhone: "+20 102 334 556",
    origin: "Cairo",
    destination: "Alexandria",
    tripDate: "28 Oct 2023",
    tripTime: "08:30 AM",
    cancellationDate: "26 Oct 2023 14:22 PM",
    countdown: "T-48h",
    refundStatus: "FULL REFUND",
    seatsCount: 2,
    payoutImpact: "- EGP 340.00",
    settlementStatus: "Processing",
  },
  {
    id: "rec-2",
    bookingRef: "BR-98845",
    channel: "WEB PORTAL",
    customerName: "Sara Khalil",
    customerPhone: "+20 115 990 123",
    origin: "Giza",
    destination: "Hurghada",
    tripDate: "27 Oct 2023",
    tripTime: "23:00 PM",
    cancellationDate: "27 Oct 2023 19:15 PM",
    countdown: "T-4h",
    refundStatus: "PARTIAL (50%)",
    seatsCount: 1,
    payoutImpact: "- EGP 210.00",
    settlementStatus: "Settled",
  },
  {
    id: "rec-3",
    bookingRef: "BR-98712",
    channel: "COUNTER",
    customerName: "Omar Mahmoud",
    customerPhone: "+20 100 554 887",
    origin: "Luxor",
    destination: "Cairo",
    tripDate: "27 Oct 2023",
    tripTime: "14:00 PM",
    cancellationDate: "27 Oct 2023 13:55 PM",
    countdown: "T-5m",
    refundStatus: "NO REFUND",
    seatsCount: 3,
    payoutImpact: "EGP 0.00",
    settlementStatus: "Operator Kept",
  },
  {
    id: "rec-4",
    bookingRef: "BR-98601",
    channel: "CORPORATE",
    customerName: "Zainab Bakir",
    customerPhone: "+20 127 112 004",
    origin: "Cairo",
    destination: "Sharm El Sheikh",
    tripDate: "26 Oct 2023",
    tripTime: "06:00 AM",
    cancellationDate: "24 Oct 2023 09:00 AM",
    countdown: "T-45h",
    refundStatus: "FULL REFUND",
    seatsCount: 1,
    payoutImpact: "- EGP 550.00",
    settlementStatus: "Settled",
  },
];

export interface OperatorPromotionItem {
  id: string;
  code: string;
  name: string;
  discountType: string;
  discountValue: string;
  applicableRoute: string;
  validFrom: string;
  validUntil: string;
  usedCount: number;
  maxRedemptions: number;
  status: "Active" | "Paused";
  totalDiscountDisbursed: string;
}

export const mockOperatorPromotions: OperatorPromotionItem[] = [
  {
    id: "pro-1",
    code: "RAMADAN24",
    name: "Holy Month Special",
    discountType: "Percentage",
    discountValue: "25%",
    applicableRoute: "Riyadh ⇄ Jeddah Express",
    validFrom: "Mar 10, 2024",
    validUntil: "Apr 10, 2024",
    usedCount: 3750,
    maxRedemptions: 5000,
    status: "Active",
    totalDiscountDisbursed: "SAR 42,150.00",
  },
  {
    id: "pro-2",
    code: "CASHBACK50",
    name: "Wallet Booster Campaign",
    discountType: "Cashback",
    discountValue: "SAR 50.00",
    applicableRoute: "All Fleet Routes",
    validFrom: "Jan 01, 2024",
    validUntil: "Dec 31, 2024",
    usedCount: 202,
    maxRedemptions: 1000,
    status: "Active",
    totalDiscountDisbursed: "SAR 10,100.00",
  },
  {
    id: "pro-3",
    code: "FIRSTRIDE",
    name: "New Passenger Welcome",
    discountType: "Percentage",
    discountValue: "15%",
    applicableRoute: "All Fleet Routes",
    validFrom: "Jan 01, 2023",
    validUntil: "Dec 31, 2024",
    usedCount: 9210,
    maxRedemptions: 10000,
    status: "Paused",
    totalDiscountDisbursed: "SAR 88,320.00",
  },
  {
    id: "pro-4",
    code: "EXPRESS10",
    name: "Dammam Coastal Flash Sale",
    discountType: "Fixed SAR",
    discountValue: "SAR 10.00",
    applicableRoute: "Riyadh ⇄ Dammam Coastal",
    validFrom: "Jun 01, 2024",
    validUntil: "Jun 30, 2024",
    usedCount: 75,
    maxRedemptions: 500,
    status: "Active",
    totalDiscountDisbursed: "SAR 750.00",
  },
];

export interface OperatorSettlementCycle {
  id: string;
  cycleId: string;
  ref: string;
  cyclePeriod: string;
  grossSAR: number;
  deductionsSAR: string;
  netSAR: number;
  status: "Processing" | "Settled" | "Review Pending";
  disbursementDate: string;
  currency: string;
  netPayout: number;
  bankAccount: string;
  tripsCount: number;
  grossAmount: number;
  commissionDeducted: number;
}

export const mockSettlementHistory: OperatorSettlementCycle[] = [
  {
    id: "set-1",
    cycleId: "PO-2309-B",
    ref: "PO-2309-B",
    cyclePeriod: "Sep 16 - Sep 30, 2023",
    grossSAR: 15500,
    deductionsSAR: "-1,550 (Ref/Canc) / -1,550 (Comm)",
    netSAR: 12400,
    status: "Processing",
    disbursementDate: "Oct 05, 2023",
    currency: "SAR",
    netPayout: 12400,
    bankAccount: "Al Rajhi Bank •••• 4019",
    tripsCount: 48,
    grossAmount: 15500,
    commissionDeducted: 1550,
  },
  {
    id: "set-2",
    cycleId: "PO-2309-A",
    ref: "PO-2309-A",
    cyclePeriod: "Sep 1 - Sep 15, 2023",
    grossSAR: 14200,
    deductionsSAR: "-1,000 (Ref/Canc) / -1,420 (Comm) / +200 (Adj)",
    netSAR: 11980,
    status: "Settled",
    disbursementDate: "Sep 20, 2023",
    currency: "SAR",
    netPayout: 11980,
    bankAccount: "Al Rajhi Bank •••• 4019",
    tripsCount: 44,
    grossAmount: 14200,
    commissionDeducted: 1420,
  },
  {
    id: "set-3",
    cycleId: "PO-2308-B",
    ref: "PO-2308-B",
    cyclePeriod: "Aug 16 - Aug 31, 2023",
    grossSAR: 18900,
    deductionsSAR: "-2,100 (Ref/Canc) / -1,890 (Comm)",
    netSAR: 14910,
    status: "Settled",
    disbursementDate: "Sep 05, 2023",
    currency: "SAR",
    netPayout: 14910,
    bankAccount: "Al Rajhi Bank •••• 4019",
    tripsCount: 56,
    grossAmount: 18900,
    commissionDeducted: 1890,
  },
];

export interface SettlementCycle {
  id: string;
  cyclePeriod: string;
  grossAmount: number;
  commission: number;
  vat: number;
  adjustments: number;
  netPayout: number;
  status: "Disbursed" | "Reconciling" | "Approved" | "Scheduled";
  disbursementDate: string;
  bankRef: string;
  bankName: string;
  ibanMasked: string;
  tripsCount: number;
}

export const mockSettlements: SettlementCycle[] = [
  {
    id: "SETT-2026-0814",
    cyclePeriod: "Oct 01 - Oct 15, 2026",
    grossAmount: 148500,
    commission: 14850,
    vat: 2227.5,
    adjustments: 0,
    netPayout: 131422.5,
    status: "Disbursed",
    disbursementDate: "Oct 17, 2026",
    bankRef: "SARIE-TXN-8849201",
    bankName: "Al Rajhi Bank",
    ibanMasked: "SA44 2000 **** **** 4821",
    tripsCount: 486,
  },
  {
    id: "SETT-2026-0813",
    cyclePeriod: "Sep 16 - Sep 30, 2026",
    grossAmount: 162000,
    commission: 16200,
    vat: 2430,
    adjustments: 500,
    netPayout: 143870,
    status: "Disbursed",
    disbursementDate: "Oct 02, 2026",
    bankRef: "SARIE-TXN-8791024",
    bankName: "Al Rajhi Bank",
    ibanMasked: "SA44 2000 **** **** 4821",
    tripsCount: 512,
  },
  {
    id: "SETT-2026-0812",
    cyclePeriod: "Sep 01 - Sep 15, 2026",
    grossAmount: 134200,
    commission: 13420,
    vat: 2013,
    adjustments: 0,
    netPayout: 118767,
    status: "Disbursed",
    disbursementDate: "Sep 17, 2026",
    bankRef: "SARIE-TXN-8654110",
    bankName: "Al Rajhi Bank",
    ibanMasked: "SA44 2000 **** **** 4821",
    tripsCount: 420,
  },
  {
    id: "SETT-2026-0811",
    cyclePeriod: "Aug 16 - Aug 31, 2026",
    grossAmount: 155800,
    commission: 15580,
    vat: 2337,
    adjustments: -350,
    netPayout: 137533,
    status: "Disbursed",
    disbursementDate: "Sep 02, 2026",
    bankRef: "SARIE-TXN-8542918",
    bankName: "Al Rajhi Bank",
    ibanMasked: "SA44 2000 **** **** 4821",
    tripsCount: 495,
  },
  {
    id: "SETT-2026-0810",
    cyclePeriod: "Aug 01 - Aug 15, 2026",
    grossAmount: 141000,
    commission: 14100,
    vat: 2115,
    adjustments: 0,
    netPayout: 124785,
    status: "Disbursed",
    disbursementDate: "Aug 17, 2026",
    bankRef: "SARIE-TXN-8431092",
    bankName: "Al Rajhi Bank",
    ibanMasked: "SA44 2000 **** **** 4821",
    tripsCount: 440,
  },
];


