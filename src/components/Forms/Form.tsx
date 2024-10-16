import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  DefaultValues,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  resolver?: any;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

const ADForm = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormConfig<T>) => {
  const methods = useForm<T>({ resolver, defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ADForm;
