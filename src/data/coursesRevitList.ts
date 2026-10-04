export interface Course {
  id: string;
  title: string;
  titleBn?: string;
  slug: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  totalClasses: number;
  batchNo: string;
  batchId?: string;
  price: number;
  originalPrice: number;
  installmentAvailable: boolean;
  installmentDetails?: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  image: string;
  badge?: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  features: string[];
  description: string;
}

export const REVIT_COURSES: Course[] = [
  {
    id: "revit-combo-pro",
    title: "Professional Revit Combo Course (Architecture, Structure & MEP)",
    titleBn: "Professional Revit Combo Course (Architecture, Structure & MEP)",
    slug: "professional-revit-combo-course",
    category: "bim-combo",
    level: "All Levels",
    duration: "5 to 6 Months",
    totalClasses: 48,
    batchNo: "8th Batch",
    price: 18000,
    originalPrice: 25000,
    installmentAvailable: true,
    installmentDetails: "Flexible 3-Month Installment Plan Available",
    rating: 4.9,
    reviewsCount: 142,
    studentsCount: 620,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    badge: "Most Popular",
    instructor: {
      name: "Engr. Ashikur Rahman",
      role: "Lead BIM Specialist & Trainer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    features: [
      "Architecture, Structural, HVAC, Plumbing & Electrical Working Drawings",
      "Industry Standard Live Project Practice",
      "Recorded Video Backup & Lifetime Resource Access",
      "International Standard Verified BIM Professional Certificate",
      "Live Interactive Zoom Classes & 24/7 Dedicated Support",
    ],
    description: "Master Autodesk Revit Architectural, Structural, and MEP working methodologies to accelerate your career on national and international engineering projects.",
  },
  {
    id: "revit-arch-struct",
    title: "Professional Revit Architecture + Structure Course",
    titleBn: "Professional Revit Architecture + Structure Course",
    slug: "professional-revit-architecture-structure",
    category: "bim-combo",
    level: "Intermediate",
    duration: "3 to 4 Months",
    totalClasses: 36,
    batchNo: "5th Batch",
    price: 14000,
    originalPrice: 18000,
    installmentAvailable: true,
    installmentDetails: "Flexible 3-Month Installment Plan Available",
    rating: 4.85,
    reviewsCount: 98,
    studentsCount: 450,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    instructor: {
      name: "Engr. Mojahedur Rahman",
      role: "Senior BIM Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    features: [
      "Complete 3D Building Modeling & Detailing",
      "Structural Column, Beam, Footing & Rebar Detailing",
      "Sheet Creation, Schedules & Quantity Takeoff",
      "AutoCAD to Revit Workflow Transformation",
    ],
    description: "A comprehensive practical guide to transforming building architectural and structural designs into BIM-compliant automated workflows.",
  },
  {
    id: "revit-mep",
    title: "Professional Revit MEP Course (HVAC, Plumbing & Electrical)",
    titleBn: "Professional Revit MEP Course (HVAC, Plumbing & Electrical)",
    slug: "professional-revit-mep-course",
    category: "mep",
    level: "Intermediate",
    duration: "2 to 3 Months",
    totalClasses: 28,
    batchNo: "4th Batch",
    price: 12000,
    originalPrice: 16000,
    installmentAvailable: true,
    installmentDetails: "Flexible 3-Month Installment Plan Available",
    rating: 4.9,
    reviewsCount: 76,
    studentsCount: 310,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    badge: "High Demand",
    instructor: {
      name: "Engr. Md. Ariful Haque",
      role: "MEP Design Consultant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    features: [
      "HVAC Ductwork & Mechanical Equipment Sizing",
      "Plumbing Piping & Drainage Layout System",
      "Electrical Lighting, Cable Tray & Conduit Modeling",
      "Clash Detection with Navisworks",
    ],
    description: "Learn industry-grade modeling and working drawings for commercial and residential mechanical, electrical, and plumbing engineering systems.",
  },
];
