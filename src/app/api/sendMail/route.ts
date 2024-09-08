import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/utils/functions/sendMail";


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

