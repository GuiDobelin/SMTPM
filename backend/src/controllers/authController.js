const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usu�rio j� registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({name,email,password: hashedPassword,role: role || 'user',
        });

        res.status(200).json({ message:  newUser.role });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usu�rio', error: err.message });
    }
};

exports.login = async (req, res) => {
    debugger
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('Usu�rio n�o encontrado');
            return res.status(400).json({ message: 'Credenciais inv�lidas' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Senha inv�lida');
            return res.status(400).json({ message: 'Credenciais inv�lidas' });
        }
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            message: 'Login bem-sucedido',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Erro no login:', err.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usu�rios', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usu�rio n�o encontrado' });
        }
        res.status(200).json({ message: 'Usu�rio atualizado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usu�rio', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Usu�rio n�o encontrado' });
        }
        res.status(200).json({ message: 'Usu�rio deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usu�rio', error: err.message });
    }
};
