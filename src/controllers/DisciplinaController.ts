import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class DisciplinaController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const disciplinas = await prisma.disciplina.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                    nome: true                    
                }
            }
        );
        res.status(200).json(disciplinas);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const disciplinas = await prisma.disciplina.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    nome: true   
                }
            }
        );
        res.status(200).json(disciplinas);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, nome } = req.body;
        if (id == null || nome == null) {
            return res.status(400).json({ status: 'id e nome da disciplina devem ser fornecidos.' });
        }
        try {
            const novaDisciplina = await prisma.disciplina.create(
                {
                    data: {
                        id: id,
                        nome: nome
                    },
                    select: {
                        id: true,
                        nome: true
                    }
                });
            res.status(200).json(novaDisciplina);
        } catch (erro) {
            return res.status(400).json({ status: 'O nome da disciplina deve ser único' });
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const DisciplinaAlterada = await prisma.disciplina.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    id: true,
                    nome: true   
                }
            }
        );
        res.status(200).json(DisciplinaAlterada);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.disciplina.delete(
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
} export default DisciplinaController