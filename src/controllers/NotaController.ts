import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class NotaController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const notas = await prisma.nota.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                    valor: true                    
                }
            }
        );
        res.status(200).json(notas);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const notas = await prisma.nota.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    valor: true   
                }
            }
        );
        res.status(200).json(notas);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, valor } = req.body;
        if (id == null || valor == null) {
            return res.status(400).json({ status: 'id e valor da nota devem ser fornecidos.' });
        }
        try {
            const novaNota = await prisma.nota.create(
                {
                    data: {
                        id: id,
                        valor: valor
                    },
                    select: {
                        id: true,
                        valor: true
                    }
                });
            res.status(200).json(novaNota);
        } catch (erro) {
            if (valor < 0 || valor > 10) {
            return res.status(400).json({ status: 'O valor da nota deve ser de 0 a 10 ' });
            }
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const NotaAlterada = await prisma.nota.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    id: true,
                    valor: true   
                }
            }
        );
        res.status(200).json(NotaAlterada);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.nota.delete(
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
                return res.status(401).json({ status: 'Não deu certo' });
            }
        }
    }
} export default NotaController

//SÓ FALTA CORRIGIR A AUTENTICAÇÃO