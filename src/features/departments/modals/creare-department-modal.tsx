"use client"
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import FlexDialog from "@/components/ui/flex-dialog";
import CreateDepartmentForm from "../forms/create-department-form";

const CreateDepartmentModal: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <FlexDialog
      trigger={<Button variant="outline">Insert Department</Button>}
      onOpenChange={setOpen}
      open={open}
      title="Create new department"
      description="Create a new department"
    >
      <CreateDepartmentForm setOpen={setOpen} />
    </FlexDialog>
  );
};

export default CreateDepartmentModal;
