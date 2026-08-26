export interface InstructorBatch {
  id: string;
  name: string;
  code: string;
  studentsCount: number;
  completedClasses: number;
  totalClasses: number;
  schedule: string;
  nextClassTopic: string;
  status: "Active" | "Upcoming" | "Completed";
}

export interface StudentSubmissionFile {
  name: string;
  size: string;
  type: "RVT" | "DWG" | "PDF" | "ZIP" | "LINK";
  url: string;
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentRoll: string;
  assignmentTitle: string;
  assignmentInstructions: string;
  studentNote: string;
  submittedAt: string;
  files: StudentSubmissionFile[];
  score: number | null;
  feedback: string;
  status: "Pending" | "Graded";
}

export interface UploadedMaterial {
  id: string;
  title: string;
  batchCode: string;
  classNo: string;
  videoUrl: string;
  attachedFile: string;
  uploadDate: string;
}

export const MOCK_INSTRUCTOR_BATCHES: InstructorBatch[] = [
  {
    id: "batch-revit-8",
    name: "Professional Revit Combo (Arch + Struct + MEP)",
    code: "REV-8TH",
    studentsCount: 44,
    completedClasses: 28,
    totalClasses: 48,
    schedule: "Mon, Wed, Fri (9:00 PM - 11:00 PM)",
    nextClassTopic: "Class 29: Structural Beam-Slab Framing & Rebar Detailing",
    status: "Active",
  },
  {
    id: "batch-tekla-8",
    name: "Professional Tekla Steel Detailing Masterclass",
    code: "TEK-8TH",
    studentsCount: 38,
    completedClasses: 18,
    totalClasses: 32,
    schedule: "Sun, Tue, Thu (8:30 PM - 10:30 PM)",
    nextClassTopic: "Class 19: PEB Steel Connections & Fabrication Drawings",
    status: "Active",
  },
  {
    id: "batch-dynamo-8",
    name: "Revit Dynamo Visual Programming for Automation",
    code: "DYN-8TH",
    studentsCount: 29,
    completedClasses: 12,
    totalClasses: 24,
    schedule: "Sat, Tue (9:00 PM - 11:00 PM)",
    nextClassTopic: "Class 13: Automated Rebar Generation with Python Nodes",
    status: "Active",
  },
];

export const MOCK_STUDENT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: "sub-101",
    studentName: "Md. Ariful Islam",
    studentRoll: "BIM-2026-0842",
    assignmentTitle: "Assignment 7: 6-Storey Residential Rebar Detailing",
    assignmentInstructions: "Model 6-Storey column rebar with ties according to BNBC 2020. Export schedule sheets to PDF.",
    studentNote: "Completed all 6 columns reinforcement as per BNBC 2020. Schedule table attached on sheet S-101.",
    submittedAt: "Aug 22, 2026 (10:45 PM)",
    files: [
      { name: "Ariful_Assignment_7_Model.rvt", size: "36.4 MB", type: "RVT", url: "#" },
      { name: "Column_Schedule_Drawing_S101.pdf", size: "4.2 MB", type: "PDF", url: "#" },
    ],
    score: 95,
    feedback: "Exceptional rebar detailing and accurate scheduling. Ready for construction drawing set!",
    status: "Graded",
  },
  {
    id: "sub-102",
    studentName: "Tanvir Ahmed",
    studentRoll: "BIM-2026-0855",
    assignmentTitle: "Assignment 8: Parametric Curtain Wall & Elevation",
    assignmentInstructions: "Create custom curtain wall profiles, parametric mullions, and double-glazed facade panels.",
    studentNote: "Designed front commercial elevation with 50x150mm custom mullions and reflective solar panels.",
    submittedAt: "Aug 24, 2026 (08:30 PM)",
    files: [
      { name: "Tanvir_CurtainWall_Project.rvt", size: "42.1 MB", type: "RVT", url: "#" },
      { name: "Front_Elevation_Render.pdf", size: "6.8 MB", type: "PDF", url: "#" },
    ],
    score: null,
    feedback: "",
    status: "Pending",
  },
  {
    id: "sub-103",
    studentName: "Nusrat Jahan",
    studentRoll: "BIM-2026-0861",
    assignmentTitle: "Assignment 8: Parametric Curtain Wall & Elevation",
    assignmentInstructions: "Create custom curtain wall profiles, parametric mullions, and double-glazed facade panels.",
    studentNote: "Attached Revit project with spider glass fittings and parametric entrance canopy family.",
    submittedAt: "Aug 25, 2026 (09:15 PM)",
    files: [
      { name: "Nusrat_Elevation_Model.rvt", size: "29.8 MB", type: "RVT", url: "#" },
    ],
    score: null,
    feedback: "",
    status: "Pending",
  },
  {
    id: "sub-104",
    studentName: "Kazi Sazzad Hossain",
    studentRoll: "BIM-2026-0870",
    assignmentTitle: "Assignment 8: Parametric Curtain Wall & Elevation",
    assignmentInstructions: "Create custom curtain wall profiles, parametric mullions, and double-glazed facade panels.",
    studentNote: "Completed 3D building facade. Drive link also attached inside the zip archive.",
    submittedAt: "Aug 25, 2026 (11:00 PM)",
    files: [
      { name: "Sazzad_Shopping_Mall_Facade.rvt", size: "48.2 MB", type: "RVT", url: "#" },
      { name: "Facade_Sheets_Pack.zip", size: "15.4 MB", type: "ZIP", url: "#" },
    ],
    score: null,
    feedback: "",
    status: "Pending",
  },
];
