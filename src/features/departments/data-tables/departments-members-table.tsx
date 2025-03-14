"use client";

import React, { FC, useState } from "react";
import { departmentUserRole } from "@/types/roles";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { columns } from "../columns/departments-members-columns";
import { useGetDepartmentBySlug } from "../queries";
import EmptyData from "@/components/empty-data";
import { useUnassignedMembersWithIds } from "../mutations";

interface Props {
  slug: string;
}

const DepartmentsMembersTable: FC<Props> = ({ slug }) => {
  const [activeRole, setActiveRole] = useState<departmentUserRole>(
    departmentUserRole.LECTURER
  );

  const { data, isLoading, isError } = useGetDepartmentBySlug(slug);
  const { mutate: unasignTheseIds } = useUnassignedMembersWithIds({ slug });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error occurred.</p>;
  if (!data?.data) return <p>No data found.</p>;

  const filteredMembers = data?.data.members.filter(
    (member) => member.role === activeRole
  );

  return (
    <div className="space-y-4 mt-5">
      <Tabs
        value={activeRole}
        onValueChange={(value) => setActiveRole(value as departmentUserRole)}
      >
        <TabsList className="flex space-x-2">
          {Object.values(departmentUserRole).map((role) => (
            <TabsTrigger key={role} value={role}>
              {role}s
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredMembers.length === 0 ? (
          <EmptyData size={150}>
            <h2 className="text-lg font-semibold text-gray-300">
              No {activeRole}s found for {data.data.name}
            </h2>
          </EmptyData>
        ) : (
          Object.values(departmentUserRole).map((role) => (
            <TabsContent key={role} value={role}>
              <DataTable
                defaultSortingColumn="name"
                columns={columns({})}
                onDelete={(rows) => {
                  const ids = rows.map(({ original }) => ({
                    userId: original.userId,
                    departmentId: original.departmentId,
                  }));
                  unasignTheseIds({ idObject: ids });
                }}
                data={filteredMembers}
              />
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
};

export default DepartmentsMembersTable;
