


















































import axios from 'axios';
import qs from 'qs';
import { User, UserModel } from '../models/user.model'
import {
    FilterQuery,
    QueryOptions,
    UpdateQuery,
  } from "mongoose";

interface GoogleTokenResult {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export async function getGoogleOauthToken({code}: {code: string}): Promise<GoogleTokenResult> {
  const url = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: process.env.googleClientId as string,
    client_secret: process.env.googleClientSecret as string,
    redirect_uri: process.env.googleOauthRedirectUrl as string,
    grant_type: 'authorization_code',
  };
  try {
    const res = await axios.post<GoogleTokenResult>(url, qs.stringify(options), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
  } catch (error: any) {
    console.log(error, "Failed to fetch Google Oauth Tokens")
    throw new Error(error.message);
  }
};

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({id_token, access_token}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return res.data;
  } 
  catch (error: any) {
    console.log(error, "Error fetching Google user")
    throw new Error(error.message);
    }
}

export async function  findAndUpdateUser(
    query: FilterQuery<User>,
    update: UpdateQuery<User>,
    options: QueryOptions
  ) {
    return await UserModel.findOneAndUpdate(query, update, options);
  };