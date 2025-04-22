// app/api/image/[...key]/route.ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { key: string[] } }
) => {
  const key = params.key.join("/");

  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  try {
    const { Body, ContentType } = await s3.send(command);
    const stream = Body as ReadableStream;

    return new Response(stream, {
      headers: {
        "Content-Type": ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=86400", // optional
      },
    });
  } catch (err) {
    console.error("S3 proxy error", err);
    return new Response("Image not found", { status: 404 });
  }
};
