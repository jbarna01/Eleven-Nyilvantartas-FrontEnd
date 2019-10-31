import {Jogok} from "./Jogok";

export interface OperatorUpdateRequest {

  id:         number;
  vezetekNev: string;
  keresztNev: string;
  username:   string;
  password:   string;
  aktiv:      string;
  jogok:      Jogok;

}
