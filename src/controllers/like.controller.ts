import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { Like } from "../models/like.model";


export class LikeController {

    public async darLike(req: Request, res: Response) {
        try {
            const { idTweet } = req.params;
            const { idUsuario } = req.body;

            if (!idTweet || !idUsuario) {
                return res.status(401).send({
                    ok: false,
                    message: "As informações não foram informadas"
                });
            }

            const LikeExistente = await repository.like.findFirst({
                where: {
                    usuario: { id: idUsuario },
                    tweet: { id: idTweet }
                }
            });

            if (LikeExistente) {
                return res.status(400).send({
                    ok: false,
                    message: "Usuário já deu like neste tweet"
                });
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet
                }
            });

            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado"
                });
            }

            const usuario = await repository.usuario.findUnique({
                where: {
                    id: idUsuario
                }
            });

            if (!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado"
                });
            }

            const like = new Like(usuario, tweet);

            const result = await repository.like.create({
                data: {
                    idUsuario: idUsuario,
                    idTweet: idTweet
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

    public async dislike(req: Request, res: Response) {
        try {
            const { idTweet } = req.params;
            const { idUsuario } = req.body;

            if (!idTweet || !idUsuario) {
                return res.status(401).send({
                    ok: false,
                    message: "As informações não foram informadas"
                });
            }

            await repository.like.delete({
                where: {
                    idUsuario_idTweet: idUsuario,
                    idTweet: idTweet
                }
            });

            return res.status(200).send({
                ok: true,
                message: "Like removido com sucesso"
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            }
            )
        }
    }
}