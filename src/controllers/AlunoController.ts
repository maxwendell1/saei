import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class AlunoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const alunos = await prisma.aluno.findMany(
            {
                orderBy: { rm: 'asc' },
                select: {
                    rm: true,
                    nome: true,
                    ra: true,
                    nascimento: true,
                    endereco: true,
                    telFixo: true,
                    cel: true,
                    responsavel1: true,
                    responsavel2: true
                }
            }
        );
        res.status(200).json(alunos);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const aluno = await prisma.aluno.findUnique(
            {
                where: { rm: Number(req.params.rm) },
                select: {
                    rm: true,
                    senha: true,
                    nome: true,
                    nascimento: true,
                    ra: true,
                    endereco: true,
                    email: true,
                    telFixo: true,
                    cel: true,
                    responsavel1: true,
                    responsavel2: true
                }
            }
        );
        res.status(200).json(aluno);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const {rm, senha, nome, nascimento, ra, endereco, email, 
            telFixo, cel, responsavel1, responsavel2} = req.body;
        if (rm == null || senha == null) {
            return res.status(400).json({ status: 'rm e senha devem ser fornecidos.' });
        }
        try {
        const novoAluno = await prisma.aluno.create(
            {
                data: {
                    rm: rm,
                    senha: senha,
                    nome: nome,
                    nascimento: nascimento,
                    ra: ra,
                    endereco: endereco,
                    email: email,
                    telFixo: telFixo,
                    cel: cel,
                    responsavel1: responsavel1,
                    responsavel2: responsavel2
                },
                select: {
                    rm: true,
                    senha: true,
                    nome: true,
                    nascimento: true,
                    ra: true,
                    endereco: true,
                    email: true,
                    telFixo: true,
                    cel: true,
                    responsavel1: true,
                    responsavel2: true
                }
            }
        );

        res.status(200).json(novoAluno);
        }catch(erro){
            return res.status(400).json({ status: 'O rm do aluno deve ser único' });
        }

    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const alunoAlterado = await prisma.aluno.update(
            {
                where: { rm: Number(req.params.rm) },
                data: req.body,
                select: {
                    rm: true,
                    senha: true,
                    nome: true,
                    nascimento: true,
                    ra: true,
                    endereco: true,
                    email: true,
                    telFixo: true,
                    cel: true,
                    responsavel1: true,
                    responsavel2: true
                }
            }
        );
        res.status(200).json(alunoAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.aluno.delete(
            {
                where: { rm: Number(req.params.rm) }
            }
        );
        res.status(200).json({ excluido: true });
    }

    async autenticacao(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { rm, senha } = req.body;
        const consulta = await prisma.aluno.findFirst(
            {
                where: {
                    rm: rm,
                    senha: senha
                }
            }
        );
        if (consulta == null) {
            return res.status(401).json({ status: 'não autorizado' });
        } else {
            console.log(consulta.senha);
            console.log((await hash(senha, 8)).length);
            if (await compare(senha, consulta.senha)) {
                // Se a senha bate, gera o token
                const token = sign(
                    {
                        rm: consulta.rm
                    },
                    process.env.CHAVESEGURANCA as Secret,
                    {
                        subject: consulta.rm.toString(),
                        expiresIn: 'rm'
                    }
                );
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ status: 'não autorizado' });
            }
        }
    }
} export default AlunoController