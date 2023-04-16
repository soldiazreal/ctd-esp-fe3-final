import { Box, Stack } from "@mui/material";
import CardCheckoutProduct from "dh-marvel/components/cards/checkout-product/card-checkout-product";
import StepperForm from "dh-marvel/components/forms/stepper-form.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { Loader } from "dh-marvel/components/loading/loading.component";
import { getComicsById } from "dh-marvel/services/comic/comic.service";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IComic } from "types/IComic.type";

interface CheckoutProps {}

const Checkout: NextPage<CheckoutProps> = () => {
  const router = useRouter();
  const { comic } = router.query;
  const [comicData, setComicData] = useState<IComic | undefined>();

  useEffect(() => {
    async function fetchComicData() {
      const id = parseInt(comic as string);

      if (comic) {
        const data = await getComicsById(id);
        setComicData(data);
      }
    }
    fetchComicData();
  }, [comic]);

  if (!comic) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Checkout | DH Marvel Comics</title>
      </Head>
      <LayoutCheckout>
        <Box sx={{ padding: { xs: "80px 20px", sm: "100px 20px" } }}>
          <Stack
            direction={{ sm: "column", md: "row-reverse" }}
            spacing={{ xs: 15, sm: 15, md: 8, xl: 20 }}
            alignItems={{ xs: "center", sm: "center", md: "self-start" }}
          >
            <Box
              sx={{
                backgroundColor: "#f3f3f3",
                height: "100%",
                padding: "30px",
              }}
            >
              <CardCheckoutProduct comic={comicData} />
            </Box>
            <Box>
              <StepperForm comic={comicData} />
            </Box>
          </Stack>
        </Box>
      </LayoutCheckout>
    </>
  );
};

export default Checkout;
