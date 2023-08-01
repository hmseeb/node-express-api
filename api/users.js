// const apiKey = uuidv4().replace(/-/g, '');
import 'dotenv/config.js';

export const ensurePermissions = async (req, res, next) => {
  const apiKey = process.env.API_KEY;

  const passedKey = req.query['api_key'];
  if (!passedKey) {
    return res.status(401).send({ message: 'No API key provided', code: 401 });
  }
  if (passedKey === apiKey) {
    next();
  } else {
    return res.status(401).send({ message: 'Invalid API key', code: 401 });
  }
};
