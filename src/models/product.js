const createProduct = ({ id, name, price }) => ({
  id,
  name,
  price,
});

export const createProductFromData = (data) => createProduct(data);

export default createProduct;
