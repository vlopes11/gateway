import { PERMISSIONS } from '../utils/constants';
import { Document, DOCUMENT_ACCESS } from './document';
import { FundingAgreement } from './funding-request';
import { CoreapiNFT } from '../centrifuge-node-client';

export interface IUser {
  name: string;
  password?: string;
  email: string;
  _id?: string;
  account: string;
  permissions: PERMISSIONS[];
  schemas?: string[];
  enabled: boolean;
  invited: boolean;
}

export interface IChainAccount {
  centrifuge_chain_account: {
    id: string;
    secret: string;
    ss_58_address: string;
  }
}

export class User implements IUser {
  name: string = '';
  password?: string = '';
  email: string = '';
  _id?: string;
  account: string = '';
  chain: IChainAccount;
  permissions: PERMISSIONS[] = [];
  schemas: string[] = [];
  enabled: boolean;
  invited: boolean;
}


export const canWriteToDoc = (user: { account: string } | null, doc?: Document): boolean => {
  if (!user || !doc) return false;
  return accountHasDocAccess(user.account, DOCUMENT_ACCESS.WRITE, doc);
};

export const canReadDoc = (user: { account: string } | null, doc?: Document): boolean => {
  if (!user || !doc) return false;
  return accountHasDocAccess(user.account, DOCUMENT_ACCESS.READ, doc);
};

export const accountHasDocAccess = (account: string, access: DOCUMENT_ACCESS, doc?: Document): boolean => {
  return !!(
    doc &&
    doc.header &&
    doc.header[access] &&
    Array.isArray(doc.header[access]) &&
    doc.header[access]!.find(
      ac => ac.toLowerCase() === account.toLowerCase(),
    )
  );
};


export const canCreateDocuments = (user: User): boolean => {
  return (
    user.permissions.includes(PERMISSIONS.CAN_MANAGE_DOCUMENTS)
    && user.schemas.length > 0);
};

export const canTransferNft = (user: User, nft: CoreapiNFT): boolean => {
  try {
    return user.account.toLowerCase() === nft!.owner!.toLowerCase();
  } catch (e) {
    //Just log the error
    console.log(e);
  }
  return false;


};

export const canSignFunding = (user: User | null, funding?: FundingAgreement): boolean => {
  if (!user || !funding || !funding.funder_id) return false;
  return String(funding.funder_id).toLowerCase() === user.account.toLowerCase();
};
