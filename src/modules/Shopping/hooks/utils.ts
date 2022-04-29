import { definitions } from "types/supabase";
interface ProductToCount {
  id: string;
  name: string;
  count: number;
}
interface ProductInFridgeCount {
  id: string;
  count: number;
}

//TODO: refactor this file
export const countProduct = (products: ProductToCount[]) => {
  return products.reduce((acc: ProductToCount[], { id, name, count }) => {
    const index = acc.findIndex(x => x.id === id);
    if (index !== -1) {
      // eslint-disable-next-line security/detect-object-injection
      acc[index].count = acc[index].count + count;
    } else {
      acc = [...acc, { id, name, count }];
    }
    return acc;
  }, []);
};

const countProductInFridge = (
  productsInFridge: definitions["productinfridge"][]
) => {
  return productsInFridge.reduce(
    (acc: ProductInFridgeCount[], { productid, count }) => {
      if (count) {
        const index = acc.findIndex(x => x.id === productid);
        if (index !== -1) {
          // eslint-disable-next-line security/detect-object-injection
          acc[index].count = acc[index].count + count;
        } else {
          acc = [...acc, { id: productid, count }];
        }
      }
      return acc;
    },
    []
  );
};

export const compareWithFridge = (
  productsInFridge: definitions["productinfridge"][],
  productsToBuy: ProductToCount[]
) => {
  const productInFridgeSum = countProductInFridge(productsInFridge);
  return productsToBuy
    .map(product => {
      const index = productInFridgeSum.findIndex(
        fridgeP => fridgeP.id === product.id
      );
      if (index !== -1) {
        return {
          ...product,
          // eslint-disable-next-line security/detect-object-injection
          countInFridge: productInFridgeSum[index].count,
          // eslint-disable-next-line security/detect-object-injection
          suggestedToBuy: product.count - productInFridgeSum[index].count
        };
      }
      return { ...product, countInFridge: 0, suggestedToBuy: product.count };
    })
    .filter(product => product.suggestedToBuy > 0);
};
