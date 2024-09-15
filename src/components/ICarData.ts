export interface ICarData extends ICarDataBaseFields {
  button?: string;
}

export interface ICarDataBaseFields {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
