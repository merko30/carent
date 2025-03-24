import { decrypt } from "~/lib/auth";

export default defineEventHandler(async (e) => {
  const cookie = e.node.req.headers.cookie;

  console.log("cookie", cookie);

  const session = cookie?.split("session=")[1];

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const payload = await decrypt(session);

  if (!payload.userId || payload.expires < Date.now()) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  e.context.userId = payload.userId;
});
