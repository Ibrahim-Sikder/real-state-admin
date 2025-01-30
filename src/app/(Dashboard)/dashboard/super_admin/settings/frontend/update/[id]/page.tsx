"use client";
import React from "react";
import Loading from "@/app/loading";
import { useGetFrontendQuery } from "@/redux/api/frontendApi";


const UpdateFrontend = ({ params: { id } }: { params: { id: string } }) => {
  const { data: frontend, isLoading } = useGetFrontendQuery(undefined) as any;

  if (isLoading) return <Loading />;
  return (
    <div className="p-8">
     
    </div>
  );
};

export default UpdateFrontend;
