import { Jogok } from "./Jogok";

export class OperatorResponse {

  id:         number;
  vezetekNev: string;
  keresztNev: string;
  username:   string;
  password:   string;
  aktiv:      string;
  modositas:  Date;
  jogok:      Jogok;

}
