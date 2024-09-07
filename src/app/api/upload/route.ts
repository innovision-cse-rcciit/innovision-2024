import { uploadToGoogleDrive } from "@/utils/functions/wallPicUpload";
import { NextRequest, NextResponse } from "next/server";

// This is required to handle file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};


// Handle file upload directly
export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const fileId = await uploadToGoogleDrive(formData.get("file"), formData.get("folderName") as string);
    return new NextResponse(`FileId: ${fileId}`);
}

