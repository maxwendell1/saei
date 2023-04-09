import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class BimestreController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const bimestres = await prisma.bimestre.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                    ano: true
                }
            }
        );
        res.status(200).json(bimestres);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const bimestres = await prisma.bimestre.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    ano: true  
                }
            }
        );
        res.status(200).json(bimestres);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, ano } = req.body;
        if (id == null || ano == null) {
            return res.status(400).json({ status: 'Ano e bimestre devem ser fornecidos.' });
        }
        try {
            const novoBimestre = await prisma.bimestre.create(
                {
                    data: {
                        id: id,
                        ano: ano  
                    },
                    select: {
                        id: true,
                        ano: true  
                    }
                });
            res.status(200).json(novoBimestre);
        } catch (erro) {
            if(id < 1 || id > 4){
            return res.status(400).json({ status: 'Bimestres não podem ser repetidos. Cada ano possui apenas 4 bimestres' });
            }
        }
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const bimestreAlterado = await prisma.bimestre.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    id: true,
                    ano: true    
                }

            }
        );
        res.status(200).json(bimestreAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.bimestre.delete(
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
} export default BimestreController

//SÓ FALTA CORRIGIR A AUTENTICAÇÃO