import {
  SuccessResult,
  type SuccessResponse,
} from "../../../core/response_handlers/success_response";
import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import UserModel from "../../user/model/usermodel";
import ArtistModel from "../../artist/model/artist_model";
import { hash } from "bcryptjs";

export async function signup(
  user: any,
  type: string
): Promise<SuccessResponse | BaseErrorException> {
  // store user in user collection in the database
  const hashed = await hash(user.password, 10);
  user.password = hashed;
  if (type === "admin") {
    return new SuccessResult({
      code: 200,
      message: "Admin created successfully",
      body: { user },
    });
  } else if (type === "user") {
    const userCreated = await UserModel.create(user);

    // check if user is created
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
  } else {
    // store artist in artist collection in the database
    const artist = await ArtistModel.create(user);

    // check if artist is created

    if (!artist) {
      throw new BaseErrorException({
        message: "Failed to create artist",
        error: "failed-to-create-artist",
        logInfo: null,
        code: 400,
      });
    }
    // return success response if artist is created
    else {
      return new SuccessResult({
        code: 200,
        message: "Artist created successfully",
        body: { artist },
      });
    }
  }
}
