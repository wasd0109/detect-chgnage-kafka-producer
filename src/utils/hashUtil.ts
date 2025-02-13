// Importing 'crypto' module
import * as crypto from 'crypto'

// Create hash of SHA1 type

const generateSha1Hash=(text:string)=>{
  return  crypto.createHash('sha1')
    .update(text).digest('hex');
}

export {generateSha1Hash}
