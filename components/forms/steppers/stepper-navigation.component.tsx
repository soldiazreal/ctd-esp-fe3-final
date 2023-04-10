import React, { FC } from "react";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface StepperNavigationProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

const StepperNavigation: FC<StepperNavigationProps> = ({
  activeStep,
  handleNext,
  handleBack,
}) => {
  const isLastStep = activeStep === 2;

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          startIcon={<ChevronLeftIcon />}
        >
          ANTERIOR
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          onClick={handleNext}
          sx={{ mr: 1 }}
          endIcon={isLastStep ? undefined : <ChevronRightIcon />}
        >
          {isLastStep ? "FINALIZAR" : "SIGUIENTE"}
        </Button>
      </Box>
    </Box>
  );
};

export default StepperNavigation;
