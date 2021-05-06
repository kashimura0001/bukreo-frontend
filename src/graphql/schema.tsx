import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  name: Scalars['String'];
  role?: Maybe<UserRole>;
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
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  name: Scalars['String'];
  email: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export enum UserRole {
  Admin = 'Admin',
  Member = 'Member'
}

export type AuthComponentQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthComponentQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'avatarUrl'>
  ) }
);

export type TeamListRowFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name' | 'role'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'avatarUrl'>
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'role'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  firebaseIdToken: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id'>
  ) }
);

export type TeamSettingScreenQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type TeamSettingScreenQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type TeamsScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsScreenQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { teams?: Maybe<Array<Maybe<(
      { __typename?: 'Team' }
      & TeamListRowFragment
    )>>> }
  ) }
);

export const TeamListRowFragmentDoc = gql`
    fragment TeamListRow on Team {
  id
  name
  role
}
    `;
export const AuthComponentDocument = gql`
    query AuthComponent {
  currentUser {
    id
    name
    email
    avatarUrl
  }
}
    `;

/**
 * __useAuthComponentQuery__
 *
 * To run a query within a React component, call `useAuthComponentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthComponentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthComponentQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthComponentQuery(baseOptions?: Apollo.QueryHookOptions<AuthComponentQuery, AuthComponentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthComponentQuery, AuthComponentQueryVariables>(AuthComponentDocument, options);
      }
export function useAuthComponentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthComponentQuery, AuthComponentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthComponentQuery, AuthComponentQueryVariables>(AuthComponentDocument, options);
        }
export type AuthComponentQueryHookResult = ReturnType<typeof useAuthComponentQuery>;
export type AuthComponentLazyQueryHookResult = ReturnType<typeof useAuthComponentLazyQuery>;
export type AuthComponentQueryResult = Apollo.QueryResult<AuthComponentQuery, AuthComponentQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    name
    email
    avatarUrl
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($name: String!) {
  createTeam(input: {name: $name}) {
    id
    name
    role
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($firebaseIdToken: String!, $name: String!, $email: String!) {
  createUser(
    input: {firebaseIdToken: $firebaseIdToken, name: $name, email: $email}
  ) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      firebaseIdToken: // value for 'firebaseIdToken'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation updateTeam($teamId: ID!, $name: String!) {
  updateTeam(input: {id: $teamId, name: $name}) {
    id
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const TeamSettingScreenDocument = gql`
    query TeamSettingScreen($teamId: String!) {
  team(id: $teamId) {
    id
    name
  }
}
    `;

/**
 * __useTeamSettingScreenQuery__
 *
 * To run a query within a React component, call `useTeamSettingScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamSettingScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamSettingScreenQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamSettingScreenQuery(baseOptions: Apollo.QueryHookOptions<TeamSettingScreenQuery, TeamSettingScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamSettingScreenQuery, TeamSettingScreenQueryVariables>(TeamSettingScreenDocument, options);
      }
export function useTeamSettingScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamSettingScreenQuery, TeamSettingScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamSettingScreenQuery, TeamSettingScreenQueryVariables>(TeamSettingScreenDocument, options);
        }
export type TeamSettingScreenQueryHookResult = ReturnType<typeof useTeamSettingScreenQuery>;
export type TeamSettingScreenLazyQueryHookResult = ReturnType<typeof useTeamSettingScreenLazyQuery>;
export type TeamSettingScreenQueryResult = Apollo.QueryResult<TeamSettingScreenQuery, TeamSettingScreenQueryVariables>;
export const TeamsScreenDocument = gql`
    query TeamsScreen {
  currentUser {
    id
    name
    teams {
      ...TeamListRow
    }
  }
}
    ${TeamListRowFragmentDoc}`;

/**
 * __useTeamsScreenQuery__
 *
 * To run a query within a React component, call `useTeamsScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsScreenQuery(baseOptions?: Apollo.QueryHookOptions<TeamsScreenQuery, TeamsScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsScreenQuery, TeamsScreenQueryVariables>(TeamsScreenDocument, options);
      }
export function useTeamsScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsScreenQuery, TeamsScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsScreenQuery, TeamsScreenQueryVariables>(TeamsScreenDocument, options);
        }
export type TeamsScreenQueryHookResult = ReturnType<typeof useTeamsScreenQuery>;
export type TeamsScreenLazyQueryHookResult = ReturnType<typeof useTeamsScreenLazyQuery>;
export type TeamsScreenQueryResult = Apollo.QueryResult<TeamsScreenQuery, TeamsScreenQueryVariables>;