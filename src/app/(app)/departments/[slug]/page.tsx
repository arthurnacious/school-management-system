import PageContainer from "@/components/app/page-container";
import React, { FC } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "This Course",
  },
];
const ShowDepartment: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h2>Course with slug {slug}</h2>
    </PageContainer>
  );
};

export default ShowDepartment;
