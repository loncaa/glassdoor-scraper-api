import * as ParserService from './parser.service';
import logger from '../../logger';

export async function parseUserProfileDataController(req, res) {
    const { username, password } = req.body;

    return res.status(200).json({ ok: true });
}