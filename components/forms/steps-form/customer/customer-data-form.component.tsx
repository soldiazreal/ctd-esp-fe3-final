import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "dh-marvel/components/text-input/text-input.component";
import { personalDataSchema } from "./schema";
import StepperNavigation from "../../steppers/stepper-navigation.component";
import { ICustomer } from "types/ICheckout.type";

export type CustomerDataProps = {
  data: ICustomer;
  activeStep: number;
  handleNext: (data: ICustomer) => void;
};

const CustomerDataForm: FC<CustomerDataProps> = ({
  data,
  activeStep,
  handleNext,
}: CustomerDataProps) => {
  const methods = useForm<ICustomer>({
    resolver: yupResolver(personalDataSchema),
    defaultValues: { ...data },
  });

  const { setFocus, handleSubmit } = methods;

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit = (data: ICustomer) => {
    handleNext(data);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <ControlledTextInput name="name" label="Nombre" />
        <ControlledTextInput name="lastname" label="Apellido" />
        <ControlledTextInput name="email" label="Email" />
      </FormProvider>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={() => {}}
      />
    </Stack>
  );
};

export default CustomerDataForm;

