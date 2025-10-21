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
