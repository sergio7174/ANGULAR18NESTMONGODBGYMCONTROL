import { registerAs } from '@nestjs/config';
import { JWT_SECRETKEY, JWT_ACCESS_TOKEN_TTL } from 'src/config/constants';

export default registerAs('jwt', () => {
  return {
    secret: JWT_SECRETKEY,
    accessTokenTtl: JWT_ACCESS_TOKEN_TTL,
  };
});
