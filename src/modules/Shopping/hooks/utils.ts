interface ProductToCount {
  id: string;
  name: string;
  count: number;
}

//TODO: refactor this remove mutation of array in reduce
export const countProduct = (products: ProductToCount[]) => {
  return products.reduce((acc, { id, name, count }) => {
    const index = acc.findIndex(x => x.id === id);
    if (index !== -1) {
      // eslint-disable-next-line security/detect-object-injection
      acc[index].count = acc[index].count + count;
    } else {
      acc = [...acc, { id, name, count }];
    }
    return acc;
  }, [] as { id: string; name: string; count: number }[]);
};
