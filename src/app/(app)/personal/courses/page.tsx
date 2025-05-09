import PageContainer from "@/components/app/page-container";
import React from "react";
import ClientWrapper from "@/features/personal/client-wrapper";

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Personal", href: "/personal" },
  { label: "Courses" },
];
const PersonalCourses = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h1 className="text-3xl font-bold mb-2 px-5">Personal Courses</h1>
      <div className="border-t border-gray-500" />
      <div className="border-neutral-900 p-5 rounded-lg shadow-md shadow-black">
        <ClientWrapper />
      </div>
    </PageContainer>
  );
};

export default PersonalCourses;
