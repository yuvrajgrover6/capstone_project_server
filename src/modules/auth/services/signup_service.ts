import {
  SuccessResult,
  type SuccessResponse,
} from "../../../core/response_handlers/success_response";
import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import UserModel, { type IUserModel } from "../../user/model/usermodel";
import ArtistModel, {
  type IArtistModel,
} from "../../artist/model/artist_model";
import { hash } from "bcryptjs";
import AdminModel from "../../admin/model/AdminModel";
import mongoose from "mongoose";

export async function signup(
  user: IUserModel | IArtistModel | any,
  type: string
): Promise<SuccessResponse | BaseErrorException> {
  // Generate random ID
  const randomID = Math.random().toString(36).substring(7).toString();

  // Hash password
  const hashed = await hash(user.password, 10);
  user.password = hashed;

  if (type === "admin") {
    const admin = await AdminModel.create(user);

    if (!admin) {
      throw new BaseErrorException({
        message: "Failed to create admin",
        error: "failed-to-create-admin",
        logInfo: null,
        code: 400,
      });
    }

    return new SuccessResult({
      code: 200,
      message: "Admin created successfully",
      body: { admin },
    });
  } else if (type === "user") {
    const userCreated = await UserModel.create({
      ...user,
      id: randomID,
      type: "user",
    });

    if (!userCreated) {
      throw new BaseErrorException({
        message: "Failed to create user",
        error: "failed-to-create-user",
        logInfo: null,
        code: 400,
      });
    } else {
      return new SuccessResult({
        code: 200,
        message: "User created successfully",
        body: { user: userCreated },
      });
    }
  } else if (type === "artist") {
    user.id = randomID as string;
    const artistUser = user as IArtistModel;

    try {
      const artist = await ArtistModel.create({
        ...artistUser,
        type: "artist",
      });
      if (!artist) {
        throw new Error("Artist creation failed");
      }
      return new SuccessResult({
        code: 200,
        message: "Artist created successfully",
        body: { artist },
      });
    } catch (err) {
      console.error("Artist creation error:", err);
      throw new BaseErrorException({
        message: "Failed to create artist",
        error: "failed-to-create-artist",
        logInfo: err,
        code: 400,
      });
    }
  } else {
    throw new BaseErrorException({
      message: "Invalid user type",
      error: "invalid-user-type",
      logInfo: null,
      code: 400,
    });
  }
}
