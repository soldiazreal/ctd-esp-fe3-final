import type { NextPage } from "next";
import CardComponent from "dh-marvel/components/cards/card/card.component";
import { Grid, GridSpacing } from "@mui/material";
import { IComic } from "types/IComic.type";

interface Props {
  comics: IComic[];
  spacing?: GridSpacing;
  itemSizes?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const GridLayout: NextPage<Props> = ({
  comics,
  spacing = { xs: 3, sm: 2, md: 4 },
  itemSizes = { xs: 12, sm: 12, md: 6, lg: 4, xl: 3 },
}) => {
  const renderResults = () =>
    comics?.map((comic) => (
      <Grid item {...itemSizes} key={comic.id}>
        <CardComponent comic={comic} />
      </Grid>
    ));

  return (
    <Grid container alignItems="stretch" spacing={spacing}>
      {renderResults()}
    </Grid>
  );
};

export default GridLayout;
