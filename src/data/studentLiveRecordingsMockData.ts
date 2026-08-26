export interface LiveClassRecording {
  id: string;
  courseId: string;
  classNo: number;
  title: string;
  duration: string;
  recordedDate: string;
  videoUrl: string;
  attachedFile?: string;
  fileSize?: string;
  instructor: string;
  isWatched: boolean;
}

export const MOCK_LIVE_RECORDINGS: LiveClassRecording[] = [
  {
    id: "live-rec-28",
    courseId: "course-revit-combo",
    classNo: 28,
    title: "Class 28: Structural Column & Rebar Detailing in Revit",
    duration: "1h 52m",
    recordedDate: "Aug 22, 2026",
    videoUrl: "https://youtu.be/JMF1I6_OsgQ",
    attachedFile: "Class_28_Rebar_Model.rvt",
    fileSize: "38 MB",
    instructor: "Engr. Ashikur Rahman",
    isWatched: true,
  },
  {
    id: "live-rec-27",
    courseId: "course-revit-combo",
    classNo: 27,
    title: "Class 27: 3D Curtain Wall & Custom Parametric Family",
    duration: "1h 45m",
    recordedDate: "Aug 19, 2026",
    videoUrl: "https://youtu.be/IXf3LHpDgaM",
    attachedFile: "Curtain_Wall_Profiles.rfa",
    fileSize: "12 MB",
    instructor: "Engr. Ashikur Rahman",
    isWatched: true,
  },
  {
    id: "live-rec-26",
    courseId: "course-revit-combo",
    classNo: 26,
    title: "Class 26: Architectural Roof Framing & Ceiling Details",
    duration: "1h 40m",
    recordedDate: "Aug 16, 2026",
    videoUrl: "https://youtu.be/wZaxQW6m_iY",
    attachedFile: "Roof_Framing_Package.dwg",
    fileSize: "15 MB",
    instructor: "Engr. Ashikur Rahman",
    isWatched: false,
  },
  {
    id: "live-rec-25",
    courseId: "course-revit-combo",
    classNo: 25,
    title: "Class 25: Staircases, Railings & Multi-Floor Circulation",
    duration: "1h 55m",
    recordedDate: "Aug 13, 2026",
    videoUrl: "https://youtu.be/JMF1I6_OsgQ",
    attachedFile: "Custom_Stair_Family.rvt",
    fileSize: "22 MB",
    instructor: "Engr. Ashikur Rahman",
    isWatched: false,
  },
];
