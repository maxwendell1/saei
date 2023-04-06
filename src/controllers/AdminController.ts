import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class AdminController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const admins = await prisma.admin.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                    usuario: true,
                    senha: true
                }
            }
        );
        res.status(200).json(admins);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const admins = await prisma.admin.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    usuario: true,
                    senha: true   
                }
            }
        );
        res.status(200).json(admins);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, usuario, senha } = req.body;
        if (id == null || usuario == null || senha == null) {
            return res.status(400).json({ status: 'id, usuário e senha devem ser fornecidos.' });
        }
        try {
            const novoAdmin = await prisma.admin.create(
                {
                    data: {
                        id: id,
                        usuario: usuario,
                        senha: await hash(senha, 8) // ciptografa a senha, 8 é o salto
                    },
                    select: {
                        id: true,
                        usuario: true,
                        senha: true
                    }
                });
            res.status(200).json(novoAdmin);
        } catch (erro) {
            return res.status(400).json({ status: 'O nome de usuário deve ser único' });
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const adminAlterado = await prisma.admin.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    usuario: true,
                    senha: true   
                }
            }
        );
        res.status(200).json(adminAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.admin.delete(
            {
                where: { id: Number(req.params.id) }
            }
        );
        res.status(200).json({ excluido: true });
    }

    async autenticacao(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { usuario, senha } = req.body;
        const consulta = await prisma.admin.findFirst(
            {
                where: {
                    usuario: usuario,
                    senha: senha
                }
            }
        );
        if (consulta == null) {
            return res.status(401).json({ status: 'Não autorizado' });
        } else {
            console.log(consulta.senha);
            console.log((await hash(senha, 8)).length);
            if (await compare(senha, consulta.senha)) {
                // Se a senha bate, gera o token
                const token = sign(
                    {
                        usuario: consulta.usuario
                    },
                    process.env.CHAVESEGURANCA as Secret,
                    {
                        subject: consulta.id.toString(),
                        expiresIn: 'id'
                    }
                );
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ status: 'Não autorizado' });
            }
        }
    }
} export default AdminController