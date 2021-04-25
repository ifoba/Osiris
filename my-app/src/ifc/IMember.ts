export interface IMember {
  name: string;
  power?: number;
  warriors: IWarriors;
  group: string;
  id: string
}

export interface IWarriors {
  /* archer: number;
  infantry: number;
  cavalery: number; */
  [key:string]: number
}
