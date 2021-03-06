import { ValueTransformer } from 'typeorm';
import { hashSync } from 'bcrypt';

const encrypt: ValueTransformer = {
  to(password: string) {
    return hashSync(password, 12);
  },
  from(hash: string) {
    return hash;
  },
};

export default encrypt;
