import {Router} from 'express';
import TesteController from './controllers/TesteController';
import AlunoController from './controllers/AlunoController';
import AdminController from './controllers/AdminController';
import BimestreController from './controllers/BimestreController';
import DisciplinaController from './controllers/DisciplinaController';
import NotaController from './controllers/NotaController';
import OcorrenciaController from './controllers/OcorrenciaController';
import ProfessorController from './controllers/ProfessorController';
import TurmaController from './controllers/TurmaController';

import ValidaTeste1 from './middlewares/ValidaTeste1';
import ValidaToken from'./middlewares/ValidaToken';
const Roteador = Router();
Roteador.get(
    '/teste/:id',
    ValidaTeste1,
    new TesteController().teste1
);

//Rotas Admins:
Roteador.get('/admins', new AdminController().index); // Lista todos os admins do sistema
Roteador.get('/admins/:id', new AdminController().show); // Consulta 1 Admin
Roteador.post('/admins', new AdminController().store); // Armazena
Roteador.put('/admins/:id', new AdminController().update); // Atualiza
Roteador.delete('/admins/:id', new AdminController().delete); // Exclui
Roteador.get('/admins/autenticacao', new AdminController().autenticacao); // Autenticação - retorna um token de segurança se usuário for autenticado

//Rotas Alunos:
Roteador.get('/alunos', new AlunoController().index); // Lista todos os alunos
Roteador.get('/alunos/:rm',  new AlunoController().show); // Consulta 1 Aluno
Roteador.post('/alunos',  new AlunoController().store); // Armazena
Roteador.put('/alunos/:rm',  new AlunoController().update); // Atualiza
Roteador.delete('/alunos/:rm',  new AlunoController().delete); // Exclui
Roteador.get('/alunos/autenticacao',  new AlunoController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Bimestres:
Roteador.get('/bimestres', new BimestreController().index); // Lista todos os bimestres
Roteador.get('/bimestres/:id',  new BimestreController().show); // Consulta 1 Bimestre
Roteador.post('/bimestres',  new BimestreController().store); // Armazena
Roteador.put('/bimestres/:id',  new BimestreController().update); // Atualiza
Roteador.delete('/bimestres/:id',  new BimestreController().delete); // Exclui
Roteador.get('/bimestres/autenticacao',  new BimestreController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Disciplinas:
Roteador.get('/disciplinas', new DisciplinaController().index); // Lista todos os bimestres
Roteador.get('/disciplinas/:id',  new DisciplinaController().show); // Consulta 1 Bimestre
Roteador.post('/disciplinas',  new DisciplinaController().store); // Armazena
Roteador.put('/disciplinas/:id',  new DisciplinaController().update); // Atualiza
Roteador.delete('/disciplinas/:id',  new DisciplinaController().delete); // Exclui
Roteador.get('/disciplinas/autenticacao',  new DisciplinaController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Notas:
Roteador.get('/notas', new NotaController().index); // Lista todos os bimestres
Roteador.get('/notas/:id',  new NotaController().show); // Consulta 1 Bimestre
Roteador.post('/notas',  new NotaController().store); // Armazena
Roteador.put('/notas/:id',  new NotaController().update); // Atualiza
Roteador.delete('/notas/:id',  new NotaController().delete); // Exclui
Roteador.get('/notas/autenticacao',  new NotaController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Ocorrencias:
Roteador.get('/ocorrencias', new OcorrenciaController().index); // Lista todos os bimestres
Roteador.get('/ocorrencias/:id',  new OcorrenciaController().show); // Consulta 1 Bimestre
Roteador.post('/ocorrencias',  new OcorrenciaController().store); // Armazena
Roteador.put('/ocorrencias/:id',  new OcorrenciaController().update); // Atualiza
Roteador.delete('/ocorrencias/:id',  new OcorrenciaController().delete); // Exclui
Roteador.get('/ocorrencias/autenticacao',  new OcorrenciaController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Professores:
Roteador.get('/professores', new ProfessorController().index); // Lista todos os bimestres
Roteador.get('/professores/:id',  new ProfessorController().show); // Consulta 1 Bimestre
Roteador.post('/professores',  new ProfessorController().store); // Armazena
Roteador.put('/professores/:id',  new ProfessorController().update); // Atualiza
Roteador.delete('/professores/:id',  new ProfessorController().delete); // Exclui
Roteador.get('/professores/autenticacao',  new ProfessorController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado

//Rotas Turmas:
Roteador.get('/turmas', new TurmaController().index); // Lista todos os bimestres
Roteador.get('/turmas/:id',  new TurmaController().show); // Consulta 1 Bimestre
Roteador.post('/turmas',  new TurmaController().store); // Armazena
Roteador.put('/turmas/:id',  new TurmaController().update); // Atualiza
Roteador.delete('/turmas/:id',  new TurmaController().delete); // Exclui
Roteador.get('/turmas/autenticacao',  new TurmaController().autenticacao); // Autenticação - retorna um token de segurança se aluno for autenticado
export default Roteador;

//FALTA CRIAR OS MIDDLEWARES E TESTAR A AUTENTICAÇÃO!!!!