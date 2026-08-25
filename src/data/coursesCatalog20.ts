export interface CatalogCourse {
  id: string;
  name: string;
  category: "BIM Core" | "Structure" | "MEP" | "Drafting" | "Automation" | "Visualization" | "Management";
  instructor: string;
  totalBatches: number;
  activeBatch: string;
  activeBatchStatus: "Enrolling" | "Ongoing";
  regularFee: string;
  discountFee: string;
  totalEnrolled: number;
  totalModules: number;
}

export const PLATFORM_20_COURSES: CatalogCourse[] = [
  { id: "revit-combo-pro", name: "Professional Revit Combo (Arch + Struct + MEP)", category: "BIM Core", instructor: "Engr. Ashikur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳25,000", discountFee: "৳15,000", totalEnrolled: 820, totalModules: 8 },
  { id: "revit-arch-struct", name: "Professional Revit Architecture & Structure Pro", category: "BIM Core", instructor: "Engr. Ashikur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳20,000", discountFee: "৳12,500", totalEnrolled: 640, totalModules: 6 },
  { id: "revit-mep", name: "Professional Revit MEP & HVAC Masterclass", category: "MEP", instructor: "Engr. Maidul Islam", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳10,000", discountFee: "৳7,000", totalEnrolled: 430, totalModules: 5 },
  { id: "revit-architecture-only", name: "Professional Revit Architecture Modeling", category: "BIM Core", instructor: "Engr. Ashikur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳10,000", discountFee: "৳7,000", totalEnrolled: 510, totalModules: 5 },
  { id: "revit-structure-only", name: "Professional Revit Structural BIM & Detailing", category: "Structure", instructor: "Engr. Mojahedur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳10,000", discountFee: "৳7,000", totalEnrolled: 490, totalModules: 5 },
  { id: "revit-mep-only", name: "Professional Revit MEP Coordination & Drafting", category: "MEP", instructor: "Engr. Maidul Islam", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳10,000", discountFee: "৳7,000", totalEnrolled: 380, totalModules: 4 },
  { id: "tekla-steel-pro", name: "Professional Tekla Steel Detailing Masterclass", category: "Structure", instructor: "Engr. Maidul Islam", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳15,000", discountFee: "৳10,000", totalEnrolled: 460, totalModules: 6 },
  { id: "revit-navisworks", name: "Professional Navisworks Clash Detection & 4D", category: "BIM Core", instructor: "Engr. Ashikur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳10,000", discountFee: "৳6,000", totalEnrolled: 350, totalModules: 4 },
  { id: "autocad-pro", name: "Professional AutoCAD 2D & 3D Drafting", category: "Drafting", instructor: "Engr. Sazzad Hossain", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳8,000", discountFee: "৳6,000", totalEnrolled: 590, totalModules: 5 },
  { id: "revit-dynamo", name: "Revit Dynamo Visual Programming for Automation", category: "Automation", instructor: "Engr. Mojahedur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳15,000", discountFee: "৳10,000", totalEnrolled: 290, totalModules: 5 },
  { id: "civil-3d-pro", name: "Autodesk Civil 3D Infrastructure & Road Design", category: "Drafting", instructor: "Engr. Nazmul Huda", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳14,000", discountFee: "৳9,000", totalEnrolled: 310, totalModules: 5 },
  { id: "etabs-concrete", name: "ETABS Structural Analysis & RC Building Design", category: "Structure", instructor: "Engr. Tanvir Ahmed", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳16,000", discountFee: "৳11,000", totalEnrolled: 470, totalModules: 6 },
  { id: "staad-pro-steel", name: "STAAD.Pro Industrial Steel Structure Analysis", category: "Structure", instructor: "Engr. Tanvir Ahmed", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳15,000", discountFee: "৳10,000", totalEnrolled: 280, totalModules: 4 },
  { id: "3ds-max-vray", name: "3ds Max + V-Ray Architectural Photorealistic 3D", category: "Visualization", instructor: "Ar. Shafiul Alam", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳12,000", discountFee: "৳8,000", totalEnrolled: 390, totalModules: 5 },
  { id: "lumion-arch-viz", name: "Lumion 3D Architectural Cinematic Animation", category: "Visualization", instructor: "Ar. Shafiul Alam", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳10,000", discountFee: "৳6,500", totalEnrolled: 340, totalModules: 4 },
  { id: "sketchup-enscape", name: "SketchUp Pro + Enscape Real-Time Modeling", category: "Visualization", instructor: "Ar. Nusrat Jahan", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳9,000", discountFee: "৳6,000", totalEnrolled: 420, totalModules: 4 },
  { id: "rhino-grasshopper", name: "Rhino 3D + Grasshopper Parametric Modeling", category: "Automation", instructor: "Ar. Nusrat Jahan", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳15,000", discountFee: "৳10,000", totalEnrolled: 210, totalModules: 5 },
  { id: "primavera-p6", name: "Oracle Primavera P6 Project Management", category: "Management", instructor: "Engr. Kazi Sazzad", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳12,000", discountFee: "৳8,000", totalEnrolled: 320, totalModules: 4 },
  { id: "ms-project-bim", name: "Microsoft Project & 4D BIM Scheduling", category: "Management", instructor: "Engr. Kazi Sazzad", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Ongoing", regularFee: "৳10,000", discountFee: "৳6,500", totalEnrolled: 270, totalModules: 4 },
  { id: "scan-to-bim", name: "Point Cloud / Scan-to-BIM 3D Laser Modeling", category: "BIM Core", instructor: "Engr. Ashikur Rahman", totalBatches: 8, activeBatch: "8th Batch", activeBatchStatus: "Enrolling", regularFee: "৳18,000", discountFee: "৳12,000", totalEnrolled: 240, totalModules: 5 },
];
