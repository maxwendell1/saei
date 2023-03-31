import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class UsuarioController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const usuarios = await prisma.usuario.findMany(
            {
                orderBy: { nome: 'asc' },
                select: {
                    nome: true,
                    login: true,
                    email: true,
                    senha: true,
                }
            }
        );
        res.status(200).json(usuarios);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const usuario = await prisma.usuario.findUnique(
            {
                where: { login: String(req.params.login) },
                select: {
                    nome: true,
                    email: true,
                    aluno: {
                        
                    }
                }
            }
        );
        res.status(200).json(usuario);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { login, nome, email, senha, alunoRm } = req.body;
        const novoUsuario = await prisma.usuario.create(
            {
                data: {
                    login: login,
                    nome: nome,
                    email: email,
                    senha: senha,
                    aluno: { connect: { rm: alunoRm } }
                },
                select: {
                    login: true,
                    nome: true,
                    email: true,
                    senha: true,
                    aluno: true
                }
            }
        );

        res.status(200).json(novoUsuario);

    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const usuarioAlterado = await prisma.usuario.update(
            {
                where: { login: String(req.params.login) },
                data: req.body,
                select: {
                    login: true,
                    nome: true,
                    email: true,
                    senha: true
                }
            }
        );
        res.status(200).json(usuarioAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.usuario.delete(
            {
                where: { login: String(req.params.login) }
            }
        );
        res.status(200).json({ excluido: true });
    }
}

export default UsuarioController