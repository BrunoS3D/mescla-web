import { AuthProviders } from '@/enums';

// API
export type Cursor = {
  page: number;
  limit: number;
};

export type Paginate<T> = Cursor & {
  pageCount: number;
  data: T[];
};

export type User = {
  id: number;
  username: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  authProvider: AuthProviders;
  thirdPartyId: string | null;
};

export type Guild = {
  id: number;
  slug: string;
  name: string;
  description: string;
};
