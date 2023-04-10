import { ICheckout } from "types/ICheckout.type";
import { render, waitFor } from "@testing-library/react";

describe("checkoutForm", () => {
  const mockData: ICheckout = {
        customer:{
            name: "Sol",
            lastname: "dr",
            email: "soldr@gmail.com",
            address: {
                address1: "calle falsa 123",
                address2: "calle 2 232",
                city: "Bs as",
                state: "bs as",
                zipCode: "1231"
            }
        },
        card:{
            number: "7394834",
            cvc: "123",
            expDate: "03/26",
            nameOnCard: "Sol dr"
        },
        order:{
            name: "prueba",
            price: 50,
            image: "https://i.annihil.us/u/prod/marvel/i/mg/6/60/4c0035c9c425d.jpg",
        }
  };

  it("should return the expected response", async () => {
    const mockResponse = { success: true };
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch as any;

    const { postCheckout } = await import("./checkout.service");

    const response = await postCheckout(mockData);

    expect(mockFetch).toHaveBeenCalledWith("/api/checkout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mockData),
    });
  });
});