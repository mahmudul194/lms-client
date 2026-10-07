export interface UserAccount {
  id: string;
  name: string;
  nameEn?: string;
  email: string;
  role: "student" | "instructor" | "admin";
  avatar?: string;
}

export const DUMMY_ACCOUNTS: UserAccount[] = [
  {
    id: "1",
    name: "Student User",
    nameEn: "Student User",
    email: "student@example.com",
    role: "student",
  },
  {
    id: "2",
    name: "Instructor User",
    nameEn: "Instructor User",
    email: "instructor@example.com",
    role: "instructor",
  },
  {
    id: "3",
    name: "Admin User",
    nameEn: "Admin User",
    email: "admin@example.com",
    role: "admin",
  }
];
