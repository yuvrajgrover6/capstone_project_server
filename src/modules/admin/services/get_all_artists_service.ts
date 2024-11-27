import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import ArtistModel from "../../artist/model/artist_model";

export default async (pageNumber: string, pageSize: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const artists = await ArtistModel.find()
    .limit(limit)
    .skip(limit * (page - 1));

  if (!artists) {
    throw new BaseErrorException({
      code: 404,
      error: "No artists found",
      message: "No artists found",
      logInfo: {},
    });
  }

  return new SuccessResult({
    message: "Artists found successfully",
    body: { artists },
    code: 200,
  });
};
