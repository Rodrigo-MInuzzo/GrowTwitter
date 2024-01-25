import express from "express";
import cors from "cors";
import { UsuarioController } from "./controllers/usuario.controller";
import { TweetController } from "./controllers/tweet.controller";
import { LikeController } from "./controllers/like.controller";


const app = express();
app.use(express.json());
app.use(cors());

const usuarioController= new UsuarioController();
const tweetController= new TweetController();
const likeController = new LikeController();



app.post("/usuario", usuarioController.criarUsuario)
app.post("/login", usuarioController.login)
app.get("/buscarUsuario/:id", usuarioController.buscarUsuario)
app.get("/listarUsuarios", usuarioController.listarUsuarios)
app.post("/criarTweet/:id", tweetController.criarTweet)
app.post("/darLike/:idTweet", likeController.darLike);
app.get("/listarTweets", tweetController.listarTweets)




app.listen(3333, () => {
    console.log("A API está rodando!");
});