import crypto from 'crypto'
import config from './getConfig'

const timestamp = new Date().getTime().toString();
const str = config.str + timestamp
const hash = crypto.createHash('md5').update(str).digest('hex')
export default hash