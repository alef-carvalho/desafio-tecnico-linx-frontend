export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  exp: number;
};

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
