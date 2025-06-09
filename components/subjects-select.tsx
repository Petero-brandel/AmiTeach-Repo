import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";

interface SubjectsSelectProps {
  selectedSubjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
}

const availableSubjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "science", label: "Science" },
  { value: "social-studies", label: "Social Studies" },
];

export function SubjectsSelect({
  selectedSubjects,
  onSubjectsChange,
}: SubjectsSelectProps) {
  const handleAddSubject = (subject: string) => {
    if (subject && !selectedSubjects.includes(subject)) {
      onSubjectsChange([...selectedSubjects, subject]);
    }
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    onSubjectsChange(
      selectedSubjects.filter((subject) => subject !== subjectToRemove)
    );
  };

  return (
    <div>
      <Select value="" onValueChange={handleAddSubject}>
        <SelectTrigger>
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          {availableSubjects.map((subject) => (
            <SelectItem key={subject.value} value={subject.value}>
              {subject.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedSubjects.map((subject) => (
          <div
            key={subject}
            className="flex items-center bg-accent text-black px-1 py-0.5 rounded-full text-sm"
          >
            <span className="mr-1">
              {availableSubjects.find((s) => s.value === subject)?.label}
            </span>
            <XIcon
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemoveSubject(subject)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
