import { CourseModuleItem, CouponItem } from "@/types/dashboard";

export const MOCK_COURSE_MODULES: CourseModuleItem[] = [
  {
    id: "mod-1",
    courseId: "revit-combo-pro",
    courseName: "Revit Combo Pro",
    moduleNo: "Module 01",
    moduleTitle: "BIM Fundamentals & UI Navigation",
    duration: "6 Hours",
    lessons: [
      { id: "les-101", title: "Introduction to BIM Levels & LOD Standards", videoUrl: "https://youtu.be/I1JAEnnHOSE", duration: "45m", resourcesCount: 3 },
      { id: "les-102", title: "Project Levels, Grids & CAD Linking", videoUrl: "https://youtu.be/IXf3LHpDgaM", duration: "52m", resourcesCount: 2 },
    ],
  },
  {
    id: "mod-2",
    courseId: "revit-combo-pro",
    courseName: "Revit Combo Pro",
    moduleNo: "Module 02",
    moduleTitle: "Architectural Wall Systems & Custom Families",
    duration: "10 Hours",
    lessons: [
      { id: "les-201", title: "Curtain Walls, Mullions & Panel Grids", videoUrl: "https://youtu.be/wZaxQW6m_iY", duration: "58m", resourcesCount: 4 },
      { id: "les-202", title: "Custom Parametric Door & Window Families", videoUrl: "https://youtu.be/JMF1I6_OsgQ", duration: "64m", resourcesCount: 5 },
    ],
  },
  {
    id: "mod-3",
    courseId: "tekla-steel-pro",
    courseName: "Tekla Steel Detailing",
    moduleNo: "Module 01",
    moduleTitle: "Steel Modeling & Connection Design",
    duration: "8 Hours",
    lessons: [
      { id: "les-301", title: "Base Plates, Anchor Bolts & Column Splice", videoUrl: "https://youtu.be/IXf3LHpDgaM", duration: "50m", resourcesCount: 2 },
    ],
  },
];

export const MOCK_COUPONS: CouponItem[] = [
  {
    id: "cp-1",
    code: "BIM2026PRO",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 12000,
    maxDiscount: 3000,
    expiryDate: "2026-09-30",
    usageLimit: 100,
    usedCount: 38,
    applicableCourse: "All Courses",
    isActive: true,
  },
  {
    id: "cp-2",
    code: "EIDSPECIAL",
    discountType: "flat",
    discountValue: 2000,
    minOrderAmount: 14000,
    expiryDate: "2026-08-31",
    usageLimit: 50,
    usedCount: 47,
    applicableCourse: "Revit Combo Pro",
    isActive: true,
  },
  {
    id: "cp-3",
    code: "EARLYBIRD",
    discountType: "flat",
    discountValue: 1500,
    minOrderAmount: 10000,
    expiryDate: "2026-07-31",
    usageLimit: 30,
    usedCount: 30,
    applicableCourse: "Tekla Steel Detailing",
    isActive: false,
  },
];
