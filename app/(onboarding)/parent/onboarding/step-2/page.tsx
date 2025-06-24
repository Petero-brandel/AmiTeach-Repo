"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil } from "lucide-react";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "../../../components";
import {
  updateParentStep2,
  type OnboardingActionState,
} from "../../../actions";
import AddChildModal, { Child } from "./addChildModal";

export default function ParentStep2() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editInitialChild, setEditInitialChild] = useState<Child | undefined>(
    undefined
  );

  const [state, formAction, pending] = useActionState<
    OnboardingActionState,
    FormData
  >(updateParentStep2, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Children information saved!");
      router.push("/parent/step-3");
    } else if (state.status === "failed" || state.status === "invalid_data") {
      toast.error(state.message || "Failed to save children information");
    }
  }, [state, router]);

  const openAddDialog = () => {
    setEditingIndex(null);
    setEditInitialChild(undefined);
    setDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setEditInitialChild(children[index]);
    setDialogOpen(true);
  };

  const handleChildSave = (child: Child) => {
    if (editingIndex !== null) {
      const updated = [...children];
      updated[editingIndex] = child;
      setChildren(updated);
    } else {
      setChildren([...children, child]);
    }
    setDialogOpen(false);
  };

  const handleSubmit = (formData: FormData) => {
    const newFormData = new FormData();
    children.forEach((child, index) => {
      newFormData.append(`children[${index}].name`, child.name);
      newFormData.append(`children[${index}].gender`, child.gender);
      newFormData.append(`children[${index}].gradeLevel`, child.gradeLevel);
      newFormData.append(`children[${index}].purpose`, child.purpose);
    });
    formAction(newFormData);
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={3}
      title="About child"
      description="Tell us more about your children."
    >
      <Form action={handleSubmit} className="space-y-10">
        <div>
          <div className="mb-3 font-semibold text-xs text-muted-foreground tracking-wider">
            STUDENTS
          </div>
          <div className="bg-white rounded-xl border p-0 mb-8 shadow-sm">
            {children.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-3">
                <span className="text-3xl">Add Child</span>
                <div>No child added yet.</div>
                <div className="text-xs text-muted-foreground">
                  Click <span className="font-semibold">Add child</span> below
                  to get started.
                </div>
              </div>
            ) : (
              children.map((child, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b last:border-b-0 px-8 py-5 gap-2"
                >
                  <div>
                    <div className="font-semibold text-base">
                      {child.name}
                      {child.gradeLevel && (
                        <span className="ml-2 text-sm text-muted-foreground font-normal">
                          {child.gradeLevel}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {child.purpose}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(idx)}
                    className="text-primary flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AddChildModal usage */}
        <AddChildModal
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleChildSave}
          initialChild={editInitialChild}
        />

        <Button
          type="button"
          variant="outline"
          className="w-full md:w-auto mb-8"
          onClick={openAddDialog}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add child
        </Button>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={
              pending ||
              children.length === 0 ||
              children.some(
                (child) =>
                  !child.name ||
                  !child.gender ||
                  !child.gradeLevel ||
                  !child.purpose
              )
            }
            className="px-10 py-3 text-base rounded-lg"
          >
            {pending ? "Saving..." : "Next: Location"}
          </Button>
        </div>
      </Form>
    </OnboardingLayout>
  );
}
