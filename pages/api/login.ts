import type {NextApiRequest, NextApiResponse} from 'next';
import {conectaMongoDB} from '../../middlewares/conectaMongoDB';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg'


const endpointLogin = (
    req : NextApiRequest,
    res: NextApiResponse<respostaPadraoMsg>
) => {
    if(req.method == 'POST'){
        const {login, senha} = req.body;

        if (login === 'admin@admin.com' &&
            senha === 'Admin@123'){
               return res.status(200).json({msg: 'Usuário autenticado com sucesso!'})
            }
            return res.status(400).json({erro: 'Usuário ou senha incorreta'});
    }
    return res.status(405).json({erro: 'Método informado inválido'});
}

export default conectaMongoDB(endpointLogin);