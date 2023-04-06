import {Router} from 'express';
import TesteController from './controllers/TesteController';
import AlunoController from './controllers/AlunoController';
import AdminController from './controllers/AdminController';
import ValidaTeste1 from './middlewares/ValidaTeste1';
const Roteador = Router();
Roteador.get(
    '/teste/:id',
    ValidaTeste1,
    new TesteController().teste1
);

//Rotas Aluno:
Roteador.get('/alunos', new AlunoController().index); // Lista todos os alunos
Roteador.get('/alunos/:rm', new AlunoController().show); // Consulta 1 Aluno
Roteador.post('/alunos', new AlunoController().store); // Armazena
Roteador.put('/alunos/:rm', new AlunoController().update); // Atualiza
Roteador.delete('/alunos/:rm', new AlunoController().delete); // Exclui
Roteador.get('/alunos/autenticacao', new AlunoController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Admin:
Roteador.get('/admins', new AdminController().index); // Lista todos os admins do sistema
Roteador.get('/admins/:id', new AdminController().show); // Consulta 1 Admin
Roteador.post('/admins', new AdminController().store); // Armazena
Roteador.put('/admins/:id', new AdminController().update); // Atualiza
Roteador.delete('/admins/:id', new AdminController().delete); // Exclui
Roteador.get('/admins/autenticacao', new AdminController().autenticacao); // Autenticação - retorna um token de segurança se usuário for autenticado

export default Roteador;

//FALTA CRIAR OS MIDDLEWARES E TESTAR A AUTENTICAÇÃO!!!!