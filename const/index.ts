import {
  Home,
  Users,
  BookOpen,
  FileText,
  Calendar,
  BarChart3,
  GraduationCap,
  CreditCard,
  MessageSquare,
  CheckSquare,
} from "lucide-react";

export const menuItems = {
  teacher: [
    { icon: Home, label: "Dashboard", href: "/teacher" },
    { icon: Users, label: "Students", href: "/teacher/students" },
    { icon: BookOpen, label: "Materials", href: "/teacher/materials" },
    { icon: FileText, label: "Quizzes", href: "/teacher/quizzes" },
    { icon: Calendar, label: "Classes", href: "/teacher/classes" },
    { icon: BarChart3, label: "Progress", href: "/teacher/progress" },
  ],
  student: [
    { icon: Home, label: "Dashboard", href: "/student" },
    { icon: GraduationCap, label: "Teachers", href: "/student/teachers" },
    { icon: BookOpen, label: "Materials", href: "/student/materials" },
    { icon: Calendar, label: "Classes", href: "/student/classes" },
    { icon: FileText, label: "Quizzes", href: "/student/quizzes" },
    { icon: CheckSquare, label: "Practice", href: "/student/practice" },
    { icon: CreditCard, label: "Payments", href: "/student/payments" },
  ],
  admin: [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: CreditCard, label: "Payments", href: "/admin/payments" },
    { icon: BookOpen, label: "Content", href: "/admin/content" },
    { icon: MessageSquare, label: "Concerns", href: "/admin/concerns" },
  ],
};
