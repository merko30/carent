import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const createS3Client = () => {
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_REGION
  ) {
    throw new Error("AWS credentials are not set in environment variables");
  }
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
};

// Helper: Converts File/Blob to Buffer
const fileToBuffer = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const uploadImageToS3 = async (
  client: S3Client,
  file: File,
  filePath: string = "images"
) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileName = `${filePath}/${file.name.replace(
    /[^a-zA-Z0-9.]/g,
    "_"
  )}_${Date.now()}`;

  const buffer = await fileToBuffer(file);

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    const data = await client.send(new PutObjectCommand(uploadParams));
    console.log("Successfully uploaded file to S3", data);
    return fileName;
  } catch (err) {
    console.error("Error uploading file to S3", err);
    throw new Error("Error uploading file to S3");
  }
};
