import { AuthProviders } from '@/enums';

// API
export type User = {
  id: number;
  username: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  authProvider: AuthProviders;
  thirdPartyId: string | null;
};
