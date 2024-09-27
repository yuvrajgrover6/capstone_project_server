import {
  SuccessResult,
  type SuccessResponse,
} from "../../../core/response_handlers/success_response";
import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import UserModel from "../../user/route/usermodel";
import ArtistModel from "../../artist/model/artist_model";

export async function signup(
  user: any,
  type: string
): Promise<SuccessResponse | BaseErrorException> {
  if (type === "admin") {
    return new SuccessResult({
      code: 200,
      message: "Admin created successfully",
      body: { user },
    });
  } else if (type === "user") {
    const userCreated = await UserModel.create(user);
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
    const artist = await ArtistModel.create(user);
    if (!artist) {
      throw new BaseErrorException({
        message: "Failed to create artist",
        error: "failed-to-create-artist",
        logInfo: null,
        code: 400,
      });
    } else {
      return new SuccessResult({
        code: 200,
        message: "Artist created successfully",
        body: { artist },
      });
    }
  }
}
