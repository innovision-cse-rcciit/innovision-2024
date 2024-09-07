import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/utils/functions/sendMail";

// This is required to handle file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};


// Handle file upload directly
export async function POST(req: NextRequest) {

    const {
        to,
        subject,
        fileName,
        data
    }: {
        to: string,
        subject: string,
        fileName: string,
        data: {}
    } = await req.json();

    const res = await sendMail({
        to,
        subject,
        fileName,
        data
    });

    return new NextResponse(`${res}`);
}

