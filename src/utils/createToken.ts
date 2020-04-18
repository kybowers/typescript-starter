import jwt from 'jsonwebtoken';

const options = { expiresIn: '1h', issuer: 'kyky' };

const createToken = (username: String) => {
    const payload = { username: username };
    return {
        token: jwt.sign(payload, process.env.JWT_SECRET, options),
        status: 200,
        result: payload,
    };
};

export default createToken;
