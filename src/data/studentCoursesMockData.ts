import { EnrolledCourse } from "@/types/dashboard";

export const MOCK_STUDENT_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "course-revit-combo",
    title: "Revit Combo Pro (Architectural + Structural + MEP)",
    category: "Full BIM Lifecycle", batch: "8th Live Batch",
    instructor: "Engr. Ashikur Rahman & Engr. Maidul Islam",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    totalLessons: 10, completedLessons: 3, progressPercent: 30,
    modules: [
      {
        id: "mod-1", moduleNo: "Module 01", title: "BIM Fundamentals & Revit Interface Setup",
        lessons: [
          { id: "les-101", lessonNo: 1, title: "Lesson 01: BIM Core Principles & Navigation", duration: "1h 45m", videoUrl: "https://youtu.be/qaeHKoq_CLM?si=bEAs7wzUbK1X5M-F", description: "LOD 100-500 standards, project browser setup, and view template configurations.", resources: [{ name: "BIM_LOD_Standards.pdf", size: "3.4 MB", type: "PDF" }], isCompleted: true, isUnlocked: true },
          { id: "les-102", lessonNo: 2, title: "Lesson 02: Architectural Grids & Datum Levels", duration: "2h 10m", videoUrl: "https://youtu.be/sDCb6Sus3T8?si=hUGDTQJgRpHzbshT", description: "Architectural grid coordinate systems, datum levels, and importing DWG drawings.", resources: [{ name: "Grid_Setup_Template.rvt", size: "18 MB", type: "RVT" }], isCompleted: true, isUnlocked: true },
        ],
      },
      {
        id: "mod-2", moduleNo: "Module 02", title: "Architectural Walls & Parametric Curtain Glazing",
        lessons: [
          { id: "les-201", lessonNo: 3, title: "Lesson 03: Multi-Layer Compound Walls", duration: "1h 55m", videoUrl: "https://youtu.be/hGI_eWHMVX4?si=3HXLQhd8c48X-Rpd", description: "Compound wall assemblies, thermal layers, and automated material schedules.", resources: [{ name: "Wall_Assemblies_Library.rfa", size: "12 MB", type: "RFA" }], isCompleted: true, isUnlocked: true },
          { id: "les-202", lessonNo: 4, title: "Lesson 04: Parametric Curtain Walls & Mullions", duration: "2h 05m", videoUrl: "https://youtu.be/uC9qU3X1JgM?si=Ph0iOENuRfsN23hB", description: "Curtain wall pattern creation, custom mullion profiles, and door modeling.", resources: [{ name: "Curtain_Mullions_Pack.dwg", size: "8.5 MB", type: "DWG" }], isCompleted: false, isUnlocked: true },
        ],
      },
      {
        id: "mod-3", moduleNo: "Module 03", title: "Structural Columns, Beams & 3D Rebar Detailing",
        lessons: [
          { id: "les-301", lessonNo: 5, title: "Lesson 05: Structural Column & Beam Framing", duration: "2h 15m", videoUrl: "https://youtu.be/qaeHKoq_CLM?si=bEAs7wzUbK1X5M-F", description: "RCC column grids, framing systems, beam-slab joints, and analytical modeling.", resources: [{ name: "RCC_Framing_Model.rvt", size: "24 MB", type: "RVT" }], isCompleted: false, isUnlocked: false },
          { id: "les-302", lessonNo: 6, title: "Lesson 06: Automated 3D Rebar Scheduling to BNBC", duration: "2h 30m", videoUrl: "https://youtu.be/sDCb6Sus3T8?si=hUGDTQJgRpHzbshT", description: "Bar Bending Schedule (BBS) generation and construction sheet drafting.", resources: [{ name: "BNBC_Rebar_Schedule.xlsx", size: "2.1 MB", type: "XLSX" }], isCompleted: false, isUnlocked: false },
        ],
      },
      {
        id: "mod-4", moduleNo: "Module 04", title: "MEP Coordination, HVAC Duct & Pipe Routing",
        lessons: [
          { id: "les-401", lessonNo: 7, title: "Lesson 07: Mechanical HVAC Duct Systems", duration: "1h 50m", videoUrl: "https://youtu.be/hGI_eWHMVX4?si=3HXLQhd8c48X-Rpd", description: "Supply & return air duct sizing, diffusers placement, and duct fitting setup.", resources: [{ name: "HVAC_Duct_Template.rvt", size: "22 MB", type: "RVT" }], isCompleted: false, isUnlocked: false },
          { id: "les-402", lessonNo: 8, title: "Lesson 08: Plumbing Sanitary & Fire Protection", duration: "2h 00m", videoUrl: "https://youtu.be/uC9qU3X1JgM?si=Ph0iOENuRfsN23hB", description: "Drainage slopes, water supply loops, sprinkler heads layout, and fixture units.", resources: [{ name: "Fire_Protection_Guide.pdf", size: "4.5 MB", type: "PDF" }], isCompleted: false, isUnlocked: false },
        ],
      },
      {
        id: "mod-5", moduleNo: "Module 05", title: "Navisworks Clash Detection & 4D Simulation",
        lessons: [
          { id: "les-501", lessonNo: 9, title: "Lesson 09: Hard & Soft Clash Matrix Analysis", duration: "2h 10m", videoUrl: "https://youtu.be/qaeHKoq_CLM?si=bEAs7wzUbK1X5M-F", description: "Multi-discipline federated model creation, clash tolerance rules, and reports.", resources: [{ name: "Clash_Report_Sample.html", size: "1.8 MB", type: "HTML" }], isCompleted: false, isUnlocked: false },
          { id: "les-502", lessonNo: 10, title: "Lesson 10: 4D TimeLiner Construction Linking", duration: "2h 20m", videoUrl: "https://youtu.be/sDCb6Sus3T8?si=hUGDTQJgRpHzbshT", description: "Linking MS Project schedules with 3D BIM components for construction animation.", resources: [{ name: "TimeLiner_Schedule.csv", size: "650 KB", type: "CSV" }], isCompleted: false, isUnlocked: false },
        ],
      },
    ],
  },
  {
    id: "course-tekla-steel",
    title: "Professional Tekla Steel Detailing Masterclass",
    category: "Structural Fabrication", batch: "3rd Weekend Batch",
    instructor: "Engr. Mojahedur Rahman",
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&q=80&w=800",
    totalLessons: 6, completedLessons: 1, progressPercent: 17,
    modules: [
      {
        id: "tek-mod-1", moduleNo: "Module 01", title: "Tekla Environment, 3D Grids & Column Modeling",
        lessons: [
          { id: "tek-101", lessonNo: 1, title: "Lesson 01: Tekla Interface & Grid Construction", duration: "1h 50m", videoUrl: "https://youtu.be/hGI_eWHMVX4?si=3HXLQhd8c48X-Rpd", description: "Working planes setup, view filters, and steel profiles database.", resources: [{ name: "Tekla_Grid_Config.xml", size: "1.2 MB", type: "XML" }], isCompleted: true, isUnlocked: true },
          { id: "tek-102", lessonNo: 2, title: "Lesson 02: Base Plate & Anchor Bolt Joint Connection", duration: "2h 10m", videoUrl: "https://youtu.be/uC9qU3X1JgM?si=Ph0iOENuRfsN23hB", description: "Column base plate modeling, stiffeners, and anchor bolt detailing.", resources: [{ name: "Base_Plate_Detail.pdf", size: "3.1 MB", type: "PDF" }], isCompleted: false, isUnlocked: true },
        ],
      },
      {
        id: "tek-mod-2", moduleNo: "Module 02", title: "Beam-to-Column Moment & Shear Connections",
        lessons: [
          { id: "tek-201", lessonNo: 3, title: "Lesson 03: Moment Connection with Bolted End Plates", duration: "2h 20m", videoUrl: "https://youtu.be/qaeHKoq_CLM?si=bEAs7wzUbK1X5M-F", description: "Moment connections (Component 144), bolt grades, and weld symbols.", resources: [{ name: "End_Plate_Sample.zip", size: "14 MB", type: "ZIP" }], isCompleted: false, isUnlocked: false },
          { id: "tek-202", lessonNo: 4, title: "Lesson 04: Shear Fin Plate & Web Angle Splices", duration: "2h 05m", videoUrl: "https://youtu.be/sDCb6Sus3T8?si=hUGDTQJgRpHzbshT", description: "Simple shear connections, beam-to-girder framing clips, and slotted bolt holes.", resources: [{ name: "Shear_Connection_Sheet.pdf", size: "2.8 MB", type: "PDF" }], isCompleted: false, isUnlocked: false },
        ],
      },
      {
        id: "tek-mod-3", moduleNo: "Module 03", title: "Roof Trusses, Purlins & Shop Drawing Reports",
        lessons: [
          { id: "tek-301", lessonNo: 5, title: "Lesson 05: Industrial PEB Roof Truss & Bracing", duration: "2h 15m", videoUrl: "https://youtu.be/hGI_eWHMVX4?si=3HXLQhd8c48X-Rpd", description: "PEB rafters, sag rods, fly bracings, and gusset plate modeling.", resources: [{ name: "PEB_Truss_Standard.dwg", size: "16 MB", type: "DWG" }], isCompleted: false, isUnlocked: false },
          { id: "tek-302", lessonNo: 6, title: "Lesson 06: Automated Assembly & Shop Drawings", duration: "2h 30m", videoUrl: "https://youtu.be/uC9qU3X1JgM?si=Ph0iOENuRfsN23hB", description: "Fabrication BOM extraction, NC/DXF export, and title block layout.", resources: [{ name: "Shop_Drawing_Template.tpl", size: "3.2 MB", type: "TPL" }], isCompleted: false, isUnlocked: false },
        ],
      },
    ],
  },
  {
    id: "course-revit-dynamo",
    title: "Revit Dynamo BIM Visual Programming & Automation",
    category: "Computational BIM", batch: "2nd Batch",
    instructor: "Engr. Ashikur Rahman",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    totalLessons: 4, completedLessons: 0, progressPercent: 0,
    modules: [
      {
        id: "dyn-mod-1", moduleNo: "Module 01", title: "Dynamo Nodes, Math & List Management",
        lessons: [
          { id: "dyn-101", lessonNo: 1, title: "Lesson 01: Dynamo Interface & Data Types", duration: "1h 40m", videoUrl: "https://youtu.be/qaeHKoq_CLM?si=bEAs7wzUbK1X5M-F", description: "Visual programming syntax, code blocks, math operations, and Point logic.", resources: [{ name: "Dynamo_Basics_Script.dyn", size: "450 KB", type: "DYN" }], isCompleted: false, isUnlocked: true },
          { id: "dyn-102", lessonNo: 2, title: "Lesson 02: List Lacing, Flattening & Element Selection", duration: "2h 00m", videoUrl: "https://youtu.be/sDCb6Sus3T8?si=hUGDTQJgRpHzbshT", description: "Longest/Shortest/Cross lacing and Category filter queries.", resources: [{ name: "List_Lacing_Demo.dyn", size: "520 KB", type: "DYN" }], isCompleted: false, isUnlocked: false },
        ],
      },
      {
        id: "dyn-mod-2", moduleNo: "Module 02", title: "Automated Rebar & Sheet Generation",
        lessons: [
          { id: "dyn-201", lessonNo: 3, title: "Lesson 03: Automated Rebar Placement", duration: "2h 15m", videoUrl: "https://youtu.be/hGI_eWHMVX4?si=3HXLQhd8c48X-Rpd", description: "Placing reinforcement along complex bridge curves and retained walls.", resources: [{ name: "Auto_Rebar_Script.dyn", size: "850 KB", type: "DYN" }], isCompleted: false, isUnlocked: false },
          { id: "dyn-202", lessonNo: 4, title: "Lesson 04: 100+ PDF Sheet Generation in 1-Click", duration: "1h 55m", videoUrl: "https://youtu.be/uC9qU3X1JgM?si=Ph0iOENuRfsN23hB", description: "Automating floor plan view creation, title block placement, and batch PDF export.", resources: [{ name: "Batch_Sheet_Maker.dyn", size: "620 KB", type: "DYN" }], isCompleted: false, isUnlocked: false },
        ],
      },
    ],
  },
];
