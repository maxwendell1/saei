import {Router} from 'express';
import TesteController from './controllers/TesteController';
import UsuarioController from './controllers/UsuarioController';
import ValidaTeste1 from './middlewares/ValidaTeste1';
const Roteador = Router();
Roteador.get(
    '/teste/:id',
    ValidaTeste1,
    new TesteController().teste1
);

Roteador.get('/usuarios', new UsuarioController().index); // Lista todos os usuários
Roteador.get('/usuarios/:login', new UsuarioController().show); // Consulta 1 Usuário
Roteador.post('/usuarios', new UsuarioController().store); // Armazenar
Roteador.put('/usuarios/:login', new UsuarioController().update); // Atualizar
Roteador.delete('/usuarios/:login', new UsuarioController().delete); // Excluir

export default Roteador;