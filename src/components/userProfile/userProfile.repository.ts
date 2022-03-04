import { UserProfileModel } from './userProfile.model';
import { UserProfile } from './userProfile.type';

const InMemoryDatabase: Record<string, UserProfileModel> = {};

export function createUserProfile(username: string, payload: UserProfile): UserProfileModel {
  const data = {
    id: username,
    ...payload,
  };

  InMemoryDatabase[username] = data;
  return data;
}

export function uploadUserProfile(username, payload: UserProfileModel): UserProfileModel {
  if (!InMemoryDatabase[username]) {
    return null;
  }

  const data = { ...InMemoryDatabase[username], ...payload };
  InMemoryDatabase[username] = data;

  return data;
}

export function getUserProfile(username): UserProfileModel {
  return InMemoryDatabase[username];
}

export function removeUserProfile(username): UserProfileModel {
  if (!InMemoryDatabase[username]) {
    return null;
  }

  const data = { ...InMemoryDatabase[username] };
  delete InMemoryDatabase[username];

  return data;
}
