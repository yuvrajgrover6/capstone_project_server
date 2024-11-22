import type { Request, Response } from "express";
import path from "path";
import fs from "fs";

export default (req: Request, res: Response) => {
  const fileName: string = req.query.name?.toString() || "";
  const filePath: string = req.query.path?.toString() || "";

  const file = path.resolve(__dirname, `../../../${path}`);

  // Check if the file is a directory
  fs.stat(file, (err, stats) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      if (stats.isDirectory()) {
        res.status(400).send("Invalid file request: It's a directory");
      } else {
        res.download(file, fileName, (downloadErr) => {
          if (downloadErr) {
            res.status(500).send(downloadErr.message);
          }
        });
      }
    }
  });
};
