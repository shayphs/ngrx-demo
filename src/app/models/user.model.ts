// מודל משתמש
export interface User {
  id: number;
  name: string;
}

// מודל הזמנה
export interface Order {
  id: number;
  userId: number;
  total: number;
}

// סטייט של משתמשים
export interface UserState {
  entities: { [id: string]: User };
  selectedUserId: number | null;
}

// סטייט כולל של האפליקציה
export interface AppState {
  users: UserState;
  orders: {
    entities: { [id: string]: Order };
  };
}
