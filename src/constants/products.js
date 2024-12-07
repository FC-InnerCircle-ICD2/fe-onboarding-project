class Product {
  static currentId = 1
  constructor(name, price) {
    this.id = Product.currentId++
    this.name = name
    this.price = price
  }
}

export const products = [
  new Product("쿨라", 1500),
  new Product("속이사이다", 1700),
  new Product("판타지판타", 1500),
  new Product("오뎅국물", 1800),
  new Product("부장라떼", 800),
  new Product("판타지판타2", 1500),
  new Product("레드뿔", 2500),
  new Product("핫세븐", 1900),
  new Product("커피우유", 1400)
]