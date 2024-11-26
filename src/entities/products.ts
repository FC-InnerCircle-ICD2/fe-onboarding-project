export type TProduct = {
  id: string;
  name: string;
  price: number;
};

export const products: Array<TProduct> = [
  { id: '0001', name: '콜라', price: 1500 },
  { id: '0002', name: '사이다', price: 1500 },
  { id: '0003', name: '환타', price: 1800 },
  { id: '0004', name: '제로콜라', price: 2500 },
  { id: '0005', name: '제로사이다', price: 2500 },
  { id: '0006', name: '밀키스', price: 1200 },
  { id: '0007', name: '제로밀키스', price: 2500 },
  { id: '0008', name: '하이볼', price: 3000 },
  { id: '0009', name: '맥주', price: 4500 },
];

export class ProductController {
  private product: TProduct | null = null;

  getProduct(): TProduct | null {
    return this.product;
  }

  setProduct(product: TProduct) {
    this.product = product;
  }

  resetProduct() {
    this.product = null;
  }
}
