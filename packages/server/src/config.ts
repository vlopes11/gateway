import { env } from 'process';
import { PERMISSIONS } from '../../lib/utils/constants';

const config = {
  // URI for centrifuge node
  centrifugeUrl: env.CENTRIFUGE_URL || 'http://127.0.0.1:8082',
  // Port on which the application will run
  applicationPort: env.APPLICATION_PORT || '3001',
  sessionSecret: env.SESSION_SECRET || 'centrifuge',
  // We use replace to create a new database without changing the deployment config
  dbPath: env.DB_PATH ? env.DB_PATH.replace('db', 'db1') : './db',
  // Default admin user that will be created
  admin: {
    name: env.CENTRIFUGE_ADMIN_USER || 'admin',
    email: env.CENTRIFUGE_ADMIN_EMAIL || 'test@test.org',
    password: env.CENTRIFUGE_ADMIN_PASSWORD || 'admin',
    // Centrifuge Identity Address
    account: env.CENTRIFUGE_ADMIN_ACCOUNT || '0xA37Dee95eCDB1c10A476122C76908479cA1A495d',
    chain: {
      centrifuge_chain_account : {
        id: env.CENTRIFUGE_CHAIN_ID || '5GVimUaccBq1XbjZ99Zmm8aytG6HaPCjkZGKSHC1vgrsQsLQ',
        secret: env.CENTRIFUGE_CHAIN_SECRET || '0xc405224448dcd4259816b09cfedbd8df0e6796b16286ea18efa2d6343da5992e',
        ss_58_address: env.CENTRIFUGE_CHAIN_ADDRESS || '0xe22b94b0b31792a48c173066cc48cf2c0df646bc990add739430cd5cf99a4c36',
      },
    },
    permissions: [PERMISSIONS.CAN_MANAGE_USERS, PERMISSIONS.CAN_MANAGE_SCHEMAS, PERMISSIONS.CAN_VIEW_DOCUMENTS, PERMISSIONS.CAN_MANAGE_DOCUMENTS],
  },
  inviteOnly: Boolean(env.INVITE_ONLY || true),
  ethNetwork: env.ETH_NETWORK || 'mainnet',
  ethProvider: env.ETH_PROVIDER || 'https://mainnet.infura.io/v3/55b957b5c6be42c49e6d48cbb102bdd5',
};
export default config;
