import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {hash, compare} from'bcryptjs';  // pacote de criptografia
import { Secret, sign } from'jsonwebtoken'; // sign é usado para gerar o token


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
                    endereco: true,
                    
                    telFixo: true,      
                    cel: true,    
                    responsavel1: true, 
                    responsavel2: true,
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
                    nome: true,
                    rm: true,
                    ra: true,
                    endereco: true
                }
            }
        );
        res.status(200).json(aluno);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const {rm, usuario, senha, nome, nascimento, ra, endereco, 
               email, telFixo, cel, responsavel1, responsavel2, } = req.body;
        const novoAluno = await prisma.aluno.create(
            {
                data: {
                    rm: rm,          
                          
                         
                    nome: nome,         
                       
                    ra: ra,
                    endereco: endereco,
                    
                    telFixo: telFixo,      
                    cel: cel,    
                    responsavel1: responsavel1, 
                    responsavel2: responsavel2,
                },
                select: {

                }
            }
        );

        res.status(200).json(novoAluno);

    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const alunoAlterado = await prisma.aluno.update(
            {
                where: { rm: Number(req.params.rm) },
                data: req.body,
                select: {

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

    async autenticacao(req:Request,res:Response){ 
        const prisma = new PrismaClient(); 
        const {rm, senha} = req.body; 
        const consulta = await prisma.aluno.findFirst(             
            {                 
                where: {                     
                    rm: rm,
                                     
                }             
            }         
            ); 
            if (consulta==null){ 
                return res.status(401).json({status: 'não autorizado'});
            } else {             
                console.log(consulta.senha);             
                console.log((await hash(senha,8)).length); 
                if (await compare(senha,consulta.senha)) { 
                    // senha batem
                    // gerar token
                    const token = sign(                     
                        {                         
                            email: consulta.email                     
                        },                     
                        process.env.CHAVESEGURANCA as Secret,                     
                        {                         
                            subject: consulta.rm.toString(),                         
                            expiresIn: 'rm'                    
                        }                 
                    ); 
                    return res.status(200).json({token:token});             
                } else { 
                    return res.status(401).json({status: 'não autorizado'});             
                }         
            }     
        }
}

export default AlunoController