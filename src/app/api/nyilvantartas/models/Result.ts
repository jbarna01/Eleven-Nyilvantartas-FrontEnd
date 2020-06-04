import {NyilvantartasError} from './NyilvantartasError';

export class Result<T> {

  timestamp: Date;
  status: string;
  path: string;
  data?: T;
  errors: NyilvantartasError[];

}
