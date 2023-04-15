import { Request, Response, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken'; // verifica se os parâmetros da requisição são válidos

function ValidaToken(req: Request, res: Response, next: NextFunction){
    const { token } = req.headers;
    
    verify(token as string, process.env.CHAVESEGURANCA as Secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'Não autorizado' });
        } else {
            console.log(decoded);
            return next();
        }
    });
} export default ValidaToken