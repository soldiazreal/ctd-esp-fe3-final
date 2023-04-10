import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface AccordionCollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const AccordionCollapsible = ({
  title,
  children,
}: AccordionCollapsibleProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
        <Typography variant="body2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionCollapsible;

const Accordion = styled(MuiAccordion)({
  borderBottom: "none",
  "&:last-child": {
    borderBottom: "none",
  },
});

const AccordionSummary = styled(MuiAccordionSummary)({
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "rgb(255, 255, 255)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "15px",
  },
});

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: "15px",
});

