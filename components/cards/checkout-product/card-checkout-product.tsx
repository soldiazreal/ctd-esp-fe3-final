import { FC } from "react";
import { IComic } from "types/IComic.type";
import { Box, Skeleton, Typography } from "@mui/material";

type CardCheckoutProductProps = {
  comic: IComic | undefined;
};

const CardCheckoutProduct: FC<CardCheckoutProductProps> = ({ comic }) => {
  const renderImage = () => {
    if (!comic) {
      return (
        <Skeleton
          sx={{ height: 400, minWidth: "100%" }}
          animation="wave"
          variant="rectangular"
          data-testid="skeleton-image"
        />
      );
    }
    return (
      <Box
        sx={{ minHeight: 400, minWidth: "100%" }}
        component="img"
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
    );
  };

  const renderTitle = () => {
    if (!comic) {
      return (
        <Skeleton
          sx={{ height: 25, minWidth: "100%" }}
          animation="wave"
          variant="rectangular"
          data-testid="skeleton-title"
        />
      );
    }
    return <Typography variant="h5">{comic.title}</Typography>;
  };

  const renderPrice = () => {
    if (!comic) {
      return (
        <Skeleton
          sx={{ height: 25, minWidth: "100%" }}
          animation="wave"
          variant="rectangular"
          data-testid="skeleton-price"
        />
      );
    }
    return (
      <>
        <Typography variant="h6">Pagás</Typography>
        <Typography variant="h6">$ {comic.price}</Typography>
      </>
    );
  };

  return (
    <Box sx={{ height: "100%", width: 400 }}>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        maxWidth={"400px"}
      >
        {renderImage()}
      </Box>
      {comic?.isbn && (
        <Typography
          variant="body2"
          sx={{
            paddingTop: "20px",
          }}
        >
          ISBN: {comic.isbn}
        </Typography>
      )}
      <Box sx={{ paddingY: 3 }}>{renderTitle()}</Box>
      <Box
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          borderTop: "1px solid rgba(0, 0, 0, .125)",
          display: "flex",
          justifyContent: "space-between",
          paddingY: { xs: 1.5, sm: 2.5 },
        }}
      >
        {renderPrice()}
      </Box>
    </Box>
  );
};

export default CardCheckoutProduct;