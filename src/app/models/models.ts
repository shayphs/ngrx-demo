export interface User {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
}
