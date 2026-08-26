export interface ClassRecordingSubmission {
  id: string;
  batchCode: string;
  courseName: string;
  instructorName: string;
  classNo: string;
  topic: string;
  rawRecordingUrl: string;
  passcode?: string;
  attachedModel: string;
  submittedAt: string;
  duration: string;
  notes: string;
  status: "Pending Admin Upload" | "Uploaded to YouTube" | "Needs Retake";
  youtubeUnlistedUrl?: string;
}

export const INITIAL_RECORDINGS_QUEUE: ClassRecordingSubmission[] = [
  {
    id: "rec-101",
    batchCode: "REV-8TH",
    courseName: "Professional Revit Combo (Arch + Struct + MEP)",
    instructorName: "Engr. Ashikur Rahman",
    classNo: "28",
    topic: "Structural Column & Rebar Detailing in Revit",
    rawRecordingUrl: "https://zoom.us/rec/share/88271A9B0C3D7EF",
    passcode: "BIM2026HOST",
    attachedModel: "Class_28_Rebar_Model.rvt (38 MB)",
    submittedAt: "Aug 23, 2026 (11:20 PM)",
    duration: "1h 52m",
    notes: "Audio is clear. Beam-slab rebar starts at 00:25:00. Ready for student portal.",
    status: "Uploaded to YouTube",
    youtubeUnlistedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "rec-102",
    batchCode: "REV-8TH",
    courseName: "Professional Revit Combo (Arch + Struct + MEP)",
    instructorName: "Engr. Ashikur Rahman",
    classNo: "29",
    topic: "Structural Beam-Slab Framing & Rebar Detailing",
    rawRecordingUrl: "https://drive.google.com/file/d/1aB2cD3eF4gH5iJ6kL/view",
    attachedModel: "Class_29_Framing_Model.rvt (42 MB)",
    submittedAt: "Aug 25, 2026 (11:35 PM)",
    duration: "1h 45m",
    notes: "Tonight's live class recording. Q&A section included at the end. Please upload to Module 5.",
    status: "Pending Admin Upload",
  },
  {
    id: "rec-103",
    batchCode: "TEK-8TH",
    courseName: "Professional Tekla Steel Detailing Masterclass",
    instructorName: "Engr. Maidul Islam",
    classNo: "18",
    topic: "PEB Steel Columns & Base Plate Connections",
    rawRecordingUrl: "https://zoom.us/rec/share/99182C3D4E5F6A7B",
    passcode: "TEKLA2026",
    attachedModel: "Tekla_BasePlate_Pack.zip (55 MB)",
    submittedAt: "Aug 24, 2026 (11:00 PM)",
    duration: "2h 05m",
    notes: "Includes connection macros and bolt detailing. Please upload to Tekla Module 4.",
    status: "Pending Admin Upload",
  },
  {
    id: "rec-104",
    batchCode: "DYN-8TH",
    courseName: "Revit Dynamo Visual Programming for Automation",
    instructorName: "Engr. Mojahedur Rahman",
    classNo: "12",
    topic: "Automated Rebar Generation with Python Script Nodes",
    rawRecordingUrl: "https://drive.google.com/file/d/2bC3dE4fG5hI6jK7/view",
    attachedModel: "Dynamo_Rebar_Scripts.dyn (8 MB)",
    submittedAt: "Aug 25, 2026 (10:40 PM)",
    duration: "1h 35m",
    notes: "Custom Python script nodes attached. Ready for publishing.",
    status: "Pending Admin Upload",
  },
];
