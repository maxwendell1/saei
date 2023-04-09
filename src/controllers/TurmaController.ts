import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class TurmaController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const turmas = await prisma.turma.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                }
            }
        );
        res.status(200).json(turmas);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const turmas = await prisma.turma.findUnique(
            {
                where: { id: String(req.params.id) },
                select: {
                    id: true
                }
            }
        );
        res.status(200).json(turmas);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const {id} = req.body;
        if (id == null) {
            return res.status(400).json({ status: 'O id da turma deve ser fornecido.' });
        }
        try {
            const novaTurma = await prisma.turma.create(
                {
                    data: {
                        id: id,
                    },
                    select: {
                        id: true,
                    }
                });
            res.status(200).json(novaTurma);
        } catch (erro) {
            return res.status(400).json({ status: 'O id da turma deve ser único' });
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const turmaAlterada = await prisma.turma.update(
            {
                where: { id: String(req.params.id) },
                data: req.body,
                select: {
                    id: true 
                }
            }
        );
        res.status(200).json(turmaAlterada);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.turma.delete(
            {
                where: { id: String(req.params.id) }
            }
        );
        res.status(200).json({ excluido: true });
    }

    async autenticacao(req: Request, res: Response) { console.log("olá");
        const prisma = new PrismaClient();
        const { usuario, senha } = req.body;
        console.log(req.body);
        const consulta = await prisma.admin.findFirst(
            {
                where: {
                    usuario: usuario,
                    senha: senha
                }
            }
        );
        if (consulta == null) {
            return res.status(401).json({ status: 'Não autorizadooooo' });
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
} export default TurmaController

//SÓ FALTA CORRIGIR A AUTENTICAÇÃO