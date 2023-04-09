import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class ProfessorController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const professores = await prisma.professor.findMany(
            {
                orderBy: { registro: 'asc' },
                select: {
                    registro: true,
                    senha: true,
                    nome: true,
                    endereco: true,
                    telFixo: true,
                    cel: true
                }
            }
        );
        res.status(200).json(professores);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const professores = await prisma.professor.findUnique(
            {
                where: { registro: Number(req.params.registro) },
                select: {
                    registro: true,
                    senha: true,
                    nome: true,
                    endereco: true,
                    telFixo: true,
                    cel: true  
                }
            }
        );
        res.status(200).json(professores);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { registro, senha, nome, endereco, telFixo, cel } = req.body;
        if (registro == null || senha == null || nome == null || endereco == null) {
            return res.status(400).json({ status: 'O registro, nome, senha e o endereço do professor devem ser fornecidos.' });
        }
        try {
            const novoProfessor = await prisma.professor.create(
                {
                    data: {
                        registro: registro,
                        senha: await hash(senha, 8), // ciptografa a senha, 8 é o salto
                        nome: nome,
                        endereco: endereco,
                        telFixo: telFixo,
                        cel: cel
                    },
                    select: {
                        registro: true,
                        senha: true,
                        nome: true,
                        endereco: true,
                        telFixo: true,
                        cel: true  
                    }
                });
            res.status(200).json(novoProfessor);
        } catch (erro) {
            return res.status(400).json({ status: 'O registro do professor deve ser único' });
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const professorAlterado = await prisma.professor.update(
            {
                where: { registro: Number(req.params.registro) },
                data: req.body,
                select: {
                    registro: true,
                    senha: true,
                    nome: true,
                    endereco: true,
                    telFixo: true,
                    cel: true   
                }
            }
        );
        res.status(200).json(professorAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.professor.delete(
            {
                where: { registro: Number(req.params.registro) }
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
} export default ProfessorController

//SÓ FALTA CORRIGIR A AUTENTICAÇÃO