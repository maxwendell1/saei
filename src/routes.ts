import {Router} from 'express';
import TesteController from './controllers/TesteController';
import AlunoController from './controllers/AlunoController';
import ValidaTeste1 from './middlewares/ValidaTeste1';
const Roteador = Router();
Roteador.get(
    '/teste/:id',
    ValidaTeste1,
    new TesteController().teste1
);

Roteador.get('/alunos', new AlunoController().index); // Lista todos os alunos
Roteador.get('/alunos/:login', new AlunoController().show); // Consulta 1 Aluno
Roteador.post('/alunos', new AlunoController().store); // Armazena
Roteador.put('/alunos/:login', new AlunoController().update); // Atualiza
Roteador.delete('/alunos/:login', new AlunoController().delete); // Exclui

// Autenticação - retorna um token de segurança se usuário for autenticado
Roteador.get('/alunos/autenticacao', new AlunoController().autenticacao);

export default Roteador;