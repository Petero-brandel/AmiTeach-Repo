"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Plus,
  User,
  BookOpen,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress-green";
import { Badge } from "@/components/ui/badge";

const SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "French",
  "Spanish",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "Economics",
  "Literature",
];

const GRADE_LEVELS = [
  "Pre-K",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ChildData {
  name: string;
  age: string;
  gradeLevel: string;
  subjects: string[];
  learningStyle: string;
  specialNeeds: string;
  goals: string;
}

export function AddChildModal({
  isOpen,
  onClose,
  onSuccess,
}: AddChildModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [childData, setChildData] = useState<ChildData>({
    name: "",
    age: "",
    gradeLevel: "",
    subjects: [],
    learningStyle: "",
    specialNeeds: "",
    goals: "",
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateChildData = (field: keyof ChildData, value: any) => {
    setChildData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    const updatedSubjects = checked
      ? [...childData.subjects, subject]
      : childData.subjects.filter((s) => s !== subject);
    updateChildData("subjects", updatedSubjects);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setChildData({
      name: "",
      age: "",
      gradeLevel: "",
      subjects: [],
      learningStyle: "",
      specialNeeds: "",
      goals: "",
    });
    onClose();
  };

  const handleSubmit = async () => {
    try {
      // Here you would call your server action to add the child
      // For now, we'll simulate success
      toast.success(`${childData.name} has been added successfully!`);
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error("Failed to add child. Please try again.");
    }
  };

  const canProceedStep1 =
    childData.name && childData.age && childData.gradeLevel;
  const canProceedStep2 = childData.subjects.length > 0;
  const canSubmit = canProceedStep1 && canProceedStep2;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Child</span>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={childData.name}
                    onChange={(e) => updateChildData("name", e.target.value)}
                    placeholder="Enter child's full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="3"
                    max="18"
                    value={childData.age}
                    onChange={(e) => updateChildData("age", e.target.value)}
                    placeholder="Age"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gradeLevel">Grade Level *</Label>
                <Select
                  value={childData.gradeLevel}
                  onValueChange={(value) =>
                    updateChildData("gradeLevel", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_LEVELS.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="learningStyle">Learning Style</Label>
                <Select
                  value={childData.learningStyle}
                  onValueChange={(value) =>
                    updateChildData("learningStyle", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select learning style (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual Learner</SelectItem>
                    <SelectItem value="auditory">Auditory Learner</SelectItem>
                    <SelectItem value="kinesthetic">
                      Hands-on Learner
                    </SelectItem>
                    <SelectItem value="reading">
                      Reading/Writing Learner
                    </SelectItem>
                    <SelectItem value="mixed">Mixed Learning Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Step 2: Subjects */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Subjects & Learning</h3>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">
                  Subjects Needing Help * (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {SUBJECTS.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={childData.subjects.includes(subject)}
                        onCheckedChange={(checked) =>
                          handleSubjectChange(subject, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={subject}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
                {childData.subjects.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Selected subjects:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {childData.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>
              </div>

              <div>
                <Label htmlFor="specialNeeds">
                  Special Needs or Accommodations
                </Label>
                <Input
                  id="specialNeeds"
                  value={childData.specialNeeds}
                  onChange={(e) =>
                    updateChildData("specialNeeds", e.target.value)
                  }
                  placeholder="Any special learning needs or accommodations (optional)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goals">Learning Goals</Label>
                <Input
                  id="goals"
                  value={childData.goals}
                  onChange={(e) => updateChildData("goals", e.target.value)}
                  placeholder="What would you like your child to achieve? (optional)"
                  className="mt-1"
                />
              </div>

              {/* Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Summary
                </h4>
                <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <p>
                    <strong>Name:</strong> {childData.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {childData.age}
                  </p>
                  <p>
                    <strong>Grade:</strong> {childData.gradeLevel}
                  </p>
                  <p>
                    <strong>Subjects:</strong> {childData.subjects.join(", ")}
                  </p>
                  {childData.learningStyle && (
                    <p>
                      <strong>Learning Style:</strong> {childData.learningStyle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? handleClose : prevStep}
          >
            {currentStep === 1 ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </>
            )}
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Add Child
              <Plus className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
