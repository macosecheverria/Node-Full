import compression from "compression";
import express, { Router } from "express";
import path from "path";

interface Options {
    routes: Router;
    port: number;
    publicPath?: string;
}

export class Server {
    private app = express();
    private readonly  port:number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options){
        const {routes, port ,publicPath = "public"} = options;
        this.routes =  routes;
        this.port = port;
        this.publicPath = publicPath;
    }

    async start(){
        // middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(compression());
        // public folders
        this.app.use(express.static(this.publicPath));

        //routes
        this.app.use(this.routes);

        //spa
        this.app.get("*", (req, res) => {
            const indexPath = path.join(
                __dirname + `../../../${this.publicPath}/index.html`
            )

            res.sendFile(indexPath);
        });

        // server port
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}