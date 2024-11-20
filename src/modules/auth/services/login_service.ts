import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { compare } from "bcryptjs";
import UserModel, { type IUserModel } from "../../user/model/usermodel";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import jwt from "jsonwebtoken";
import ArtistModel, {
  type IArtistModel,
} from "../../artist/model/artist_model";

export default async function (email: string, password: string) {
  let user: IUserModel | IArtistModel | null;

  // find the user in all three models
  user = await UserModel.findOne({ email });
  if (!user) {
    user = await ArtistModel.findOne({ email });
    if (!user) {
      throw new BaseErrorException({
        message: "User not found",
        error: "user-not-found",
        logInfo: null,
        code: 404,
      });
    }
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new BaseErrorException({
      message: "Password is incorrect",
      error: "password-incorrect",
      logInfo: null,
      code: 400,
    });
  } else {
    // sign the token
    const token = jwt.sign(
      { email: user.email, role: user.type, id: user.id },
      process.env.JWT_SECRET || "",
      { expiresIn: "2h" }
    );

    return new SuccessResult({
      code: 200,
      message: "Login success",
      body: { user, token },
    });
  }
}
