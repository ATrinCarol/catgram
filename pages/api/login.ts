import type {NextApiRequest, NextApiResponse} from 'next';
import {conectaMongoDB} from '../../middlewares/conectaMongoDB';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import md5 from 'md5';
import {usuarioModel} from '../../models/usuarioModel';


const endpointLogin = async (
    req : NextApiRequest,
    res: NextApiResponse<respostaPadraoMsg>
) => {
    if(req.method == 'POST'){
        const {login, senha} = req.body;

        const usuariosEncontrados = await usuarioModel.find({ email: login, senha: md5(senha)})
         if (usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados[0];
               return res.status(200).json({msg: `Usuário ${usuarioEncontrado.nome} autenticado com sucesso!`})
            }
            return res.status(400).json({erro: 'Usuário ou senha incorreta'});
    }
    return res.status(405).json({erro: 'Método informado inválido'});
}

export default conectaMongoDB(endpointLogin);