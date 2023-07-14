import fs from "fs/promises";     //importo el módulo fs

export default class ProductManager {

    constructor() {
      this.products = [];
      
    }
  
    getProducts = async () => {
      const file = await fs.readFile("./products.json", "utf8");
      const products = JSON.parse(file);
      return products;
    };
   

    addProduct = async (title, description, price, thumbnail, code, stock) => {
      

    try {
      const file = await fs.readFile('./products.json', 'utf8');  //Leemos el archivo en caso de existir        
      
      const products = JSON.parse(file)                        //Si existe tomamos la info y la parseamos
      
      const product = {
          id:
            products.length == 0 
            ? 1 
            : products[products.length - 1].id + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        

        this.products = products;

        products.push(product);
        
        await fs.writeFile('./products.json', JSON.stringify(products))   //Si no existe escribo el archivo persistiendolo con fs.write

        return product;
        
      } catch (err) {
        console.log(err);
      }

    };
    

    
  getProductById (id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    const product = this.products[productIndex];
    if (productIndex === -1) {
      return "Not found!";
    }

    console.log(this.products[productIndex]);
  }

}

