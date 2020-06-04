import {Jogok} from './Jogok';

export interface OperatorCreateModel {

  id?: number;
  vezetekNev?: string;
  keresztNev?: string;
  username?: string;
  password?: string;
  status?: string;
  modositas?: Date;
  jogok?: Jogok;

}
