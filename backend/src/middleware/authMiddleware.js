const jwt = require('jsonwebtoken');

const authMiddleware = (roleRequired) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acesso negado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (roleRequired && decoded.role !== roleRequired) {
            return res.status(403).json({ message: 'Permissão negada' });
        }
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
