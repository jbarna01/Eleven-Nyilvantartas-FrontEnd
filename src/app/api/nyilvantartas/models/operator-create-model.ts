import {Jogok} from "./Jogok";

export interface OperatorCreateModel {

  id?:         number;
  vezetekNev?: string;
  keresztNev?: string;
  username?:   string;
  password?:   string;
  aktiv?:      string;
  modositas?:  Date;
  jogok?:      Jogok;

}
