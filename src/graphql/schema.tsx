import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateTeamInput = {
  name: Scalars['String'];
};

export type CreateUserInput = {
  firebaseIdToken: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};


export type Invitation = {
  __typename?: 'Invitation';
  id: Scalars['ID'];
  team: Team;
  user: User;
  code: Scalars['String'];
  email: Scalars['String'];
  status: InvitationStatus;
  invitedAt: Scalars['DateTime'];
};

export enum InvitationStatus {
  Sent = 'Sent',
  Rejected = 'Rejected',
  Accepted = 'Accepted'
}

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID'];
  team: Team;
  user: User;
  role?: Maybe<UserRole>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeam: Team;
  updateTeam: Team;
  removeTeam: Team;
  createUser: User;
  updateUser: User;
  removeUser?: Maybe<User>;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


export type MutationRemoveTeamArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  team: Team;
  currentUser: User;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  members: Array<Member>;
  invitations: Array<Maybe<Invitation>>;
  name: Scalars['String'];
};

export type UpdateTeamInput = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  members: Array<Maybe<Member>>;
  invitations: Array<Maybe<Invitation>>;
  name: Scalars['String'];
  email: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'Admin',
  Member = 'Member'
}
