import { NextResponse } from "next/server";
import {
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/db/queries/student-queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("id");

  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    );
  }

  try {
    const student = await getStudentById(studentId);
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const newStudent = await createStudent(data);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("id");

  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    );
  }

  const data = await req.json();

  try {
    const updatedStudent = await updateStudent(studentId, data);
    return NextResponse.json(updatedStudent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("id");

  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    );
  }

  try {
    await deleteStudent(studentId);
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
