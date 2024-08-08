import { envs } from "../../config";
import { CategoryModel, ProductModel, UserModel } from "../mongo";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () =>{
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    await main();

    await MongoDatabase.disconnect();
})();

const randomBetween0AndX  = (x: number): number => {
    return Math.floor(Math.random() * x);
}

async function main() {
    // 1- Borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    // 2- Crear usuarios
    const users = await UserModel.insertMany(seedData.users);
    // 3- Crear categorias
    const categories  = await CategoryModel.insertMany(
        seedData.categories.map(category => ({
            ...category,
            user: users[0]._id
        }))
        );
    // 4- Crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map(product => ({
            ...product,
            user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
            category: categories[randomBetween0AndX(seedData.categories.length - 1)]._id            
        }))
        );

    console.log("SEEDED");
    
}