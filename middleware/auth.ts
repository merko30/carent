import { decrypt } from "~/lib/auth";

const AUTH_PAGES = ["/login", "/register"];

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on the client side entirely
  if (import.meta.client) return;

  const sessionCookie = useCookie("token");

  if (!sessionCookie.value) {
    if (!AUTH_PAGES.includes(to.path)) {
      return navigateTo("/login");
    }
    // Don't do anything
    return;
  }

  //   // Decrypt the session token
  const decryptedToken = await decrypt(sessionCookie.value!);

  // If token is expired or missing userId, redirect to login page unless already there
  if (
    (decryptedToken.expires < Date.now() || !decryptedToken.userId) &&
    to.path !== "/login"
  ) {
    return navigateTo("/login");
  }

  // If token is valid, redirect to home page if on the login page
  if (AUTH_PAGES.includes(to.path)) {
    return navigateTo("/");
  }

  // If token is valid, continue to the requested page
  return;
});
