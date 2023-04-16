import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Alert,
} from "@mui/material";
import DeliveryForm from "./delivery/delivery-form.component";
import PaymentForm from "./payment/payment-form.component";
import { IAddress, ICard, ICheckout, ICustomer } from "types/ICheckout.type";
import CustomerDataForm from "./customer/customer-data-form.component";
import { postCheckout } from "dh-marvel/services/checkout/checkout.service";
import { IComic } from "types/IComic.type";
import catchError from "./handle-checkout-errors";
import { useRouter } from "next/router";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];


type StepperFormProps = {
  comic?: IComic;
};

const StepperForm: FC<StepperFormProps> = ({ comic }) => {
  const defaultValue: ICheckout = {
    customer: {
      name: "",
      lastname: "",
      email: "",
      address: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
    order: {
      name: "",
      image: "",
      price: 0,
    },
  };
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutData, setCheckoutData] = useState(defaultValue);
  const [error, setError] = useState("");

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    if (!comic) return;
    
    setCheckoutData((prevCheckoutData) => ({
      ...prevCheckoutData,
      order: {
        name: comic.title,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        price: comic.price,
      },
    }));
  }, [comic]);

  const handleSubmitCustomerForm = (data: ICustomer) => {
    setCheckoutData(prev => ({
      ...prev,
      customer: { ...data },
    }));
    setActiveStep(prev => prev + 1);
  };
  
  const handleSubmitAddressForm = (data: IAddress) => {
    setCheckoutData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        address: { ...data },
      },
    }));
    setActiveStep(prev => prev + 1);
  };
  
  const handleSubmitPaymentForm = async (data: ICard) => {
    const newData = {
      ...checkoutData,
      card: { ...data },
    };
    const response = await postCheckout(newData);
  
    if (!response.data) {
      const error = catchError(response);
      setError(error);
    } else {
      const { customer, order } = response.data;
  
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          customer,
          order,
        })
      );
      router.push({
        pathname: "/confirmacion-compra",
      });
    }
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ paddingBottom: "5px" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Typography
          sx={{
            paddingBottom: "10px",
          }}
          variant="h5"
        >
          Paso {activeStep + 1}
        </Typography>
        {activeStep === 0 && (
          <CustomerDataForm
            data={checkoutData.customer}
            activeStep={activeStep}
            handleNext={handleSubmitCustomerForm}
          />
        )}
        {activeStep === 1 && (
          <DeliveryForm
            data={checkoutData.customer.address}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitAddressForm}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitPaymentForm}
          />
        )}
      </Box>
      {error !== "" && (
        <Alert
          severity="error"
          sx={{
            marginTop: "30px",
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default StepperForm;
