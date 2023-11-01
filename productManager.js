import {promises as fs} from "fs"


class productManager {

    constructor() {
    this.path = "./productos.txt";
    this.products = []
    }

    static id = 0;


    addProduct = async (title, description, price, thumbnail, stock, code) => {
        const objverificar = {title: title, description:description, price:price, thumbnail:thumbnail, stock:stock, code:code};
        if (this.products.find((producto) => producto.code === code) || Object.values(objverificar).includes(undefined)){
            console.log("ERROR: producto repetido o campos faltantes.");
        } else {
            this.products.push({title, description, price, thumbnail, stock, code, id:productManager.id});
            productManager.id++;
            console.log("Producto creado satisfactoriamente.");
            await fs.writeFile(this.path, JSON.stringify(this.products));
        } 
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8");
        respuesta = JSON.parse(respuesta);
        return respuesta;
    }

    getProducts = async () => {
        let consoleasync1 = await this.readProducts();
        return console.log(consoleasync1);
    };

    getProductsById = async (id) => {
        let consoleasync2 = await this.readProducts();
        if(!consoleasync2.find((product) => product.id === id)){
            console.log("No se ha podido encontrar el producto.");
        } else {
            console.log(consoleasync2.find((product) => product.id === id));
        }
        }

    deleteProductsById = async (id) =>{
        let respuesta = await this.readProducts();
        let productFilter = respuesta.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("El producto ha sido eliminado.")
    } 

    updateProducts = async ({id, ...producto}) => {   
        await this.deleteProductsById(id);
        let productoViejo = await this.readProducts()
        let productoNuevo = [ {...producto, id}, ...productoViejo];
        await fs.writeFile(this.path, JSON.stringify(productoNuevo));
        console.log("El producto ha sido reestablecido.")
    }
}

const productos = new productManager;

productos.addProduct("producto prueba 0", "Este es un producto de prueba 0", 200, "Sin imagen", 23, "ABC123");      //Crea producto
productos.addProduct("producto prueba 1", "Este es un producto de prueba 1", 200, "Sin imagen", 24, "ABC123");      //Repetido
productos.addProduct("producto prueba 2", "Este es un producto de prueba 2", 200, "Sin imagen", 25);                //Falta
productos.addProduct("producto prueba 3", "Este es un producto de prueba 3", 200, "Sin imagen", 24, "ABC125"); 
productos.addProduct("producto prueba 4", "Este es un producto de prueba 4", 200, "Sin imagen", 24, "ABC128"); 

productos.addProduct("Licuadora multifunción", "Ideal para hacer batidos, salsas y purés", 99, "ImagenLicuadora.jpg", 30, "LCB001");
productos.addProduct("Cámara de acción 4K", "Graba tus aventuras en alta resolución", 199, "ImagenCamara.jpg", 15, "CAM789");
productos.addProduct("Bicicleta de montaña todo terreno", "Perfecta para explorar senderos naturales", 349, "ImagenBicicleta.jpg", 20, "BIC456");
productos.addProduct("Smartwatch con GPS", "Mide tu actividad y te guía en tus rutas", 129, "ImagenSmartwatch.jpg", 25, "SWT002");
productos.addProduct("Set de utensilios de cocina de acero inoxidable", "Todo lo que necesitas para cocinar como un chef", 79, "ImagenUtensilios.jpg", 40, "UTC101");
productos.addProduct("Set de utensilios de cocina de acero inoxidables", "Todo lo que necesitas para cocinasdasdar como un chef", 79, "ImagenUtensilasdios.jpg", 40, "UTC1021");
productos.addProduct("producto debugging", "Este es un producto de debugging", 200, "Sin imagen", 24, "ABC13255628"); 
productos.getProducts()

//productos.getProductsById(1);

productos.deleteProductsById(2)