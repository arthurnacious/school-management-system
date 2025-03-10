"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns";
import { useGetAllDepartments } from "./queries";
import CreateDepartmentModal from "./modals/creare-department-modal";
import EditDepartmentModal from "./modals/edit-department-modal";
import { PackageOpen } from "lucide-react";

type Props = object;

// const filterColumns = [
//   { label: "Name", value: "name" },
//   { label: "Courses", value: "coursesCount" },
//   { label: "Lecturers", value: "lecturersCount" },
//   { label: "Leaders", value: "leadersCount" },
// ];

const DataWrapper: FC<Props> = ({}) => {
  const [editDepartmentSlug, setEditDepartmentSlug] = useState<
    string | undefined
  >();
  const { data: departments, isLoading, isError } = useGetAllDepartments();

  console.log(departments);
  return (
    <div>
      <div className="flex justify-between">
        <div />
        <CreateDepartmentModal />
      </div>

      <EditDepartmentModal
        slug={editDepartmentSlug}
        close={() => setEditDepartmentSlug(undefined)}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred.</p>}

      {departments?.data && departments.data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-sm">
          <PackageOpen size={100} className=" text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-300">
            No Departments in the System
          </h2>
        </div>
      )}

      {departments && (
        <DataTable
          columns={columns({
            onEditClick: setEditDepartmentSlug,
          })}
          data={departments.data}
          defaultSortingColumn="name"
        />
      )}
    </div>
  );
};

export default DataWrapper;
