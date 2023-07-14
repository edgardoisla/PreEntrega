import { Router } from 'express';

import ProductManager from '../productManager.js';

const manager = new ProductManager('products')

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {                   // Invoco la constante y accedo a sus métodos, que recibirán 2 parámetros: url y un callback (req,res)
  
    const {limit} = req.query;
  
    const products = await manager.getProducts();
    
    res.send (
    limit ? products.slice(0, limit)
    : products)
  });

  productsRouter.get("/:pid", async (req, res) => {                   // Invoco la constante y accedo a sus métodos, que recibirán 2 parámetros: url y un callback (req,res)
  
    try{
      const {pid} = req.params;
      const product =  await manager.getProducts(pid);
      res.send(product.find(product => product.id == pid))
    } catch(e){
      res.status(404).send({error: "Producto no existe" });
    }
  });

  
  productsRouter.post("/", async (req, res) => {                   
  
    const body = req.body;

      if (!body.title || !body.description || !body.code || !body.price || !body.status || !body.stock || !body.category || !body.thumbnail){
        res.send({error: true, msg: "Datos faltantes"})
      } else{
        try {

          const load = await manager.addProduct(body)

          res.send(load)

        }catch(err){

          console-log(err)

          res.status(502).send({error: true, msg:"No se pudo crear el producto"})

        }
      }
    
 });

 /*
  router.put("/"", async (req, res) => {                   
  
    
    
 });

  router.delete("/:pid", async (req, res) => {                   
  
    
    
 });

  */

  export default productsRouter