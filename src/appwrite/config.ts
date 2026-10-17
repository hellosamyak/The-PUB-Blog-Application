import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query, type Models } from "appwrite";

export interface PostData {
  title: string;
  slug: string;
  content: string;
  featuredImage: string | undefined;
  status: string;
  userId: string;
}

export interface PostUpdate {
  title: string;
  content: string;
  featuredImage: string | undefined;
  status: string;
}

export interface BlogPostRow extends Models.Row {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
  slug?: string;
}

export class DBService {
  client = new Client();
  databases: TablesDB;
  bucket: Storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: PostData): Promise<Models.Row | undefined> {
    try {
      return await this.databases.createRow<BlogPostRow>({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: PostUpdate,
  ): Promise<Models.Row | undefined> {
    try {
      return await this.databases.updateRow<BlogPostRow>({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: { title, content, featuredImage, status },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug: string): Promise<boolean> {
    try {
      await this.databases.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug: string): Promise<BlogPostRow | false> {
    try {
      return await this.databases.getRow<BlogPostRow>({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(
    queries: string[] = [Query.equal("status", "active")],
  ): Promise<Models.RowList<BlogPostRow> | false> {
    try {
      return await this.databases.listRows<BlogPostRow>({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file: File): Promise<Models.File | false> {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileID: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileID,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID: string): string {
    return this.bucket.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId: fileID,
    });
  }
}

const dbservice = new DBService();

export default dbservice;
