import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class DBService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: { title, content, featuredImage, status },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
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

  async getPost(slug) {
    try {
      return await this.databases.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows({
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

  async uploadFile(file) {
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

  async deleteFile(fileID) {
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

  getFilePreview(fileID) {
    return this.bucket.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId: fileID,
    });
  }
}

const dbservice = new DBService();

export default dbservice;
