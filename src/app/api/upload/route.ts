import { uploadToGoogleDrive } from "@/utils/functions/wallPicUpload";
import { NextRequest, NextResponse } from "next/server";


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired size limit
    },
  },
};
// Handle file upload directly
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const fileId = await uploadToGoogleDrive(
    formData.get("file"),
    formData.get("folderName") as string
  );
  return NextResponse.json({ fileId });
}
