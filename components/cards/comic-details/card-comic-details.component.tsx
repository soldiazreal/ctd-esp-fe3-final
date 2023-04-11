import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { IComic } from "types/IComic.type";
import { percentageOff } from "../../../utils/percentage";

interface Props {
  comic: IComic;
}

const CardComicDetails: NextPage<Props> = ({ comic }) => {
  const offert = percentageOff(comic?.oldPrice, comic?.price);

  return (
    <Box sx={{ paddingBottom: "30px" }}>
      <Typography gutterBottom variant="subtitle1">
        Serie: {comic.series.name}
      </Typography>
      <Typography gutterBottom variant="h5">
        {comic.title}
      </Typography>
      {comic.isbn && (
        <Typography gutterBottom variant="subtitle1">
          ISBN: {comic.isbn}
        </Typography>
      )}
      <Box sx={{ padding: "30px 0px" }}>
        {comic.oldPrice && comic.stock > 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textDecoration: "line-through",
              marginBottom: "5px",
              paddingRight: "15px",
            }}
          >
            ${comic.oldPrice}
          </Typography>
        )}

        {offert > 0 && (
          <Typography variant="h6" color="text.secondary">
            {offert}% OFF!
          </Typography>
        )}
      </Box>
      <Typography variant="h4">${comic.price}</Typography>
    </Box>
  );
};

export default CardComicDetails;
