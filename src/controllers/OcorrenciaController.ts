import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';  // pacote de criptografia
import { Secret, sign } from 'jsonwebtoken'; // sign é usado para gerar o token

class OcorrenciaController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const ocorrencias = await prisma.ocorrencia.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id: true,
                    data: true,
                    assunto: true,
                    descricao: true                   
                }
            }
        );
        res.status(200).json(ocorrencias);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const ocorrencias = await prisma.ocorrencia.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    data: true,
                    assunto: true,
                    descricao: true   
                }
            }
        );
        res.status(200).json(ocorrencias);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, data, assunto, descricao } = req.body;
        if (id == null || data == null || assunto == null || descricao == null) {
            return res.status(400).json({ status: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const novaOcorrencia = await prisma.ocorrencia.create(
                {
                    data: {
                        id: id,
                        data: data,
                        assunto: assunto,
                        descricao: descricao
                    },
                    select: {
                        id: true,
                        data: true,
                        assunto: true,
                        descricao: true
                    }
                });
            res.status(200).json(novaOcorrencia);
        } catch (erro) {
            return res.status(400).json({ status: 'O tamanho máximo na descrição da ocorrência é de 200 caracteres' });
        }
    }
    

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const NotaAlterada = await prisma.ocorrencia.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    id: true,
                    data: true,
                    assunto: true,
                    descricao: true   
                }
            }
        );
        res.status(200).json(NotaAlterada);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.ocorrencia.delete(
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
} export default OcorrenciaController

//SÓ FALTA CORRIGIR A AUTENTICAÇÃO