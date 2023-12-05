import axios from "axios";
import { readFileAsBinary } from "./readFileAsBinary";

export const uploadFile = async (uploadUrl: string, file: any) => {
  try {
    const fileData = await readFileAsBinary(file);
    const response = await axios.put(uploadUrl, fileData, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return response.status;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
