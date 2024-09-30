import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['String']['output']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  existsByUsername?: Maybe<Scalars['Boolean']['output']>;
  userByChatId?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByFirstName?: Maybe<User>;
  userById?: Maybe<User>;
  userByLastName?: Maybe<User>;
  userByMiddleName?: Maybe<User>;
};


export type QueryExistsByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUserByChatIdArgs = {
  chatId: Scalars['Int']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByFirstNameArgs = {
  firstName: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByLastNameArgs = {
  lastName: Scalars['String']['input'];
};


export type QueryUserByMiddleNameArgs = {
  middleName: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  chatList: Array<Maybe<Scalars['Int']['output']>>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
};
