import type {NextApiRequest, NextApiResponse} from 'next';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import type {cadastroUsuario} from '../../types/cadastroUsuario'; //alt+shift+seta p baixo/cima copia o código acima
import {usuarioModel} from '../../models/usuarioModel';
import {conectaMongoDB} from '../../middlewares/conectaMongoDB'
import md5 from 'md5';

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) =>{

    if (req.method === 'POST'){
        const usuario = req.body as cadastroUsuario;

        if (!usuario.nome || usuario.nome.length < 2 ){
            return res.status(400).json({ erro: 'Informe um nome válido'});
        }

        if (!usuario.email || usuario.email.length < 11 || !usuario.email.includes('@') || !usuario.email.includes('.') ){
            return res.status(405).json({ erro: 'Informe um email válido'});
        }

        if (!usuario.senha || usuario.senha.length < 4){
            return res.status(405).json({ erro: 'Informe uma senha válida'});
        }

        //validar duplicidade de email
        const usuariosComMesmoEmail = await usuarioModel.find({ email : usuario.email});
        if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0){
            return res.status(400).json({ erro: 'Usuário já existe. Verifique.'})
        }

        //salvar no banco de dados
        const usuarioQueSeraSalvo = {
            nome : usuario.nome,
            email : usuario.email,
            senha : md5(usuario.senha)
        }
        await usuarioModel.create(usuarioQueSeraSalvo);
        return res.status(200).json({ msg : 'Usuário cadastrado com sucesso'});
    } 

    return res.status(405).json({ erro : 'Método informado não é válido'});
}

export default conectaMongoDB(endpointCadastro);



