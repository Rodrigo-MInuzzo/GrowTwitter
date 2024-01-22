import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { Like } from "../models/like.model";


export class LikeController {
    
    public async darLike(req: Request, res: Response) {
        try {
            const { tweetId } = req.params;
            const { userId } = req.body;

            if (!tweetId || !userId) {
                return res.status(401).send({
                    ok: false,
                    message: "As informações não foram informadas"
                });
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: tweetId
                }
            });

            if (!tweet) {
                return res.status(401).send({
                    ok: false,
                    message: "Tweet não encontrado"
                });
            }

            const usuario = await repository.usuario.findUnique({
                where: {
                    id: userId
                }
            });

            if (!usuario) {
                return res.status(401).send({
                    ok: false,
                    message: "Usuário não encontrado"
                });
            }

            const like = new Like(usuario, tweet);

            const result = await repository.like.create({
                data: {
                    idUsuario: userId,
                    idTweet: tweetId
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Like adicionado com sucesso",
                data: result
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }
    }

}