"use client";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";

const Icons = () => {
  return (
    <PageContainer title="Icons" description="this is Icons">
      <DashboardCard title="Icons">
        <iframe
          src="/public/favicon.ico"
          title="Inline Frame Example"
          frameBorder={0}
          width="100%"
          height="650"
        ></iframe>
      </DashboardCard>
    </PageContainer>
  );
};

export default Icons;
