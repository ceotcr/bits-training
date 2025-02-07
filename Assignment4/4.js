const products = [
    { name: 'Laptop', price: 40000, category: 'Electronics' },
    { name: 'Dress', price: 2000, category: 'Clothing' },
    { name: 'Smartphone', price: 15000, category: 'Electronics' },
    { name: 'T-Shirt', price: 250, category: 'Clothing' },
    { name: 'Tablet', price: 20000, category: 'Electronics' },
    { name: 'Shoes', price: 80000, category: 'Clothing' },
    { name: 'Headphones', price: 1500, category: 'Electronics' },
    { name: 'Socks', price: 100, category: 'Clothing' },
    { name: 'Watch', price: 5000, category: 'Accessories' },
    { name: 'Belt', price: 800, category: 'Accessories' },
];

const upperCasedProducts = products.map((product) => ({ ...product, name: product.name.toUpperCase() }))
console.log("\n\nMAP: Name in uppercase!\n", upperCasedProducts)

const electronicProducts = products.filter(product => product.category == "Electronics")
console.log("\n\nFilter: Electronics only!\n", electronicProducts)

const total = products.reduce((acc, product) => acc + product.price, 0)
console.log("\n\nReduce: Total cost of all products!\n", total)

const totalPrice = (category) => {
    return products.filter(product => product.category == category).map(product => product.price).reduce((acc, price) => acc + price, 0)
}
console.log("\n\nFilter+Map+Reduce: Total price of all products in clothing category!\n", totalPrice("Clothing"))


/*

Output: 

> node 4.js


MAP: Name in uppercase!
 [
  { name: 'LAPTOP', price: 40000, category: 'Electronics' },
  { name: 'DRESS', price: 2000, category: 'Clothing' },
  { name: 'SMARTPHONE', price: 15000, category: 'Electronics' },
  { name: 'T-SHIRT', price: 250, category: 'Clothing' },
  { name: 'TABLET', price: 20000, category: 'Electronics' },
  { name: 'SHOES', price: 80000, category: 'Clothing' },
  { name: 'HEADPHONES', price: 1500, category: 'Electronics' },
  { name: 'SOCKS', price: 100, category: 'Clothing' },
  { name: 'WATCH', price: 5000, category: 'Accessories' },
  { name: 'BELT', price: 800, category: 'Accessories' }
]


Filter: Electronics only!
 [
  { name: 'Laptop', price: 40000, category: 'Electronics' },
  { name: 'Smartphone', price: 15000, category: 'Electronics' },
  { name: 'Tablet', price: 20000, category: 'Electronics' },
  { name: 'Headphones', price: 1500, category: 'Electronics' }
]


Reduce: Total cost of all products!
 164650


Filter+Map+Reduce: Total price of all products in clothing category!
 82350
 
*/