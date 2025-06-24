import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { classes as CLASS_PURPOSES } from "@/const";

const GRADE_LEVELS = CLASS_PURPOSES.map((c) => c.level);

export interface Child {
  name: string;
  gender: "boy" | "girl" | "";
  gradeLevel: string;
  purpose: string;
}

interface AddChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (child: Child) => void;
  initialChild?: Child;
}

export default function AddChildModal({
  open,
  onOpenChange,
  onSave,
  initialChild,
}: AddChildModalProps) {
  const [childForm, setChildForm] = useState<Child>(
    initialChild || {
      name: "",
      gender: "",
      gradeLevel: "",
      purpose: "",
    }
  );
  const [availablePurposes, setAvailablePurposes] = useState<
    { title: string; details: string }[]
  >([]);

  useEffect(() => {
    setChildForm(
      initialChild || {
        name: "",
        gender: "",
        gradeLevel: "",
        purpose: "",
      }
    );
  }, [initialChild, open]);

  useEffect(() => {
    if (childForm.gradeLevel) {
      const found = CLASS_PURPOSES.find(
        (c) => c.level === childForm.gradeLevel
      );
      setAvailablePurposes(found ? found.purposes : []);
    } else {
      setAvailablePurposes([]);
    }
    if (
      childForm.purpose &&
      !CLASS_PURPOSES.find(
        (c) =>
          c.level === childForm.gradeLevel &&
          c.purposes.some((p) => p.title === childForm.purpose)
      )
    ) {
      setChildForm((prev) => ({ ...prev, purpose: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childForm.gradeLevel]);

  const handleDialogFieldChange = (field: keyof Child, value: any) => {
    setChildForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "gradeLevel" ? { purpose: "" } : {}),
    }));
  };

  const handleDialogSave = () => {
    onSave(childForm);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Add child details{" "}
            <span className="inline-block align-middle ml-1 text-muted-foreground text-base">
              <span role="img" aria-label="lock">
                🔒
              </span>
            </span>
          </DialogTitle>
          <div className="text-xs text-muted-foreground mt-1">
            Information shared is confidential
          </div>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div>
            <div className="font-semibold text-lg mb-4">
              1. Class information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div>
                <Label htmlFor="child-name">Name</Label>
                <Input
                  id="child-name"
                  value={childForm.name}
                  onChange={(e) =>
                    handleDialogFieldChange("name", e.target.value)
                  }
                  placeholder="Child's first name"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="boy"
                      checked={childForm.gender === "boy"}
                      onChange={() => handleDialogFieldChange("gender", "boy")}
                      className="accent-blue-600"
                    />
                    <span>Boy</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="girl"
                      checked={childForm.gender === "girl"}
                      onChange={() => handleDialogFieldChange("gender", "girl")}
                      className="accent-blue-600"
                    />
                    <span>Girl</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="child-grade">What class?</Label>
                <Select
                  value={childForm.gradeLevel}
                  onValueChange={(value) => {
                    handleDialogFieldChange("gradeLevel", value);
                  }}
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select class" />
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
            </div>
            <div className="mt-2">
              <Label htmlFor="child-purpose">Purpose for lessons</Label>
              <Select
                value={childForm.purpose}
                onValueChange={(value) =>
                  handleDialogFieldChange("purpose", value)
                }
                required
                disabled={!childForm.gradeLevel}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {availablePurposes.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-muted-foreground">
                      Select a class first
                    </div>
                  ) : (
                    availablePurposes.map((purpose) => (
                      <SelectItem
                        key={purpose.title}
                        value={purpose.title}
                        className="py-2"
                      >
                        <div className="block font-medium">{purpose.title}</div>
                        <div className="block text-xs text-muted-foreground mt-1">
                          {purpose.details}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-8 flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleDialogSave}
            disabled={
              !childForm.name ||
              !childForm.gender ||
              !childForm.gradeLevel ||
              !childForm.purpose
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
