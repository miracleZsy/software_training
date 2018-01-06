import cookieUtil from './cookieUtil';
import jwt from 'jsonwebtoken';

const isBoss = jwt.decode(cookieUtil.get('token')).authority == 1;

export default isBoss;