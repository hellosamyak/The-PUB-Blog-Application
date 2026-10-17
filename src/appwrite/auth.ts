/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID, type Models } from "appwrite";

interface AccountCredentials {
  email: string;
  password: string;
}

interface CreateAccountCredentials extends AccountCredentials {
  name: string;
}

export class AuthService {
  client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: CreateAccountCredentials): Promise<Models.Session | Models.User> {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        // call another method to login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({
    email,
    password,
  }: AccountCredentials): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<Models.User | null> {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
