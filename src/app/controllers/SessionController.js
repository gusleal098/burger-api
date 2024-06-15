import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(request, response) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
                password: Yup.string().required('A senha é obrigatória')
            });

            if (!(await schema.isValid(request.body))) {
                return response.status(400).json({ error: 'Falha na validação dos dados' });
            }

            const { email, password } = request.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return response.status(401).json({ error: 'Usuário não encontrado' });
            }

            if (!(await user.checkPassword(password))) {
                return response.status(401).json({ error: 'Senha incorreta' });
            }

            const { id, name, admin } = user;

            return response.json({
                user: {
                    id,
                    name,
                    email,
                    admin,
                },
                token: jwt.sign({ id, name }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });
        } catch (err) {
            console.error('Erro no login:', err);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new SessionController();