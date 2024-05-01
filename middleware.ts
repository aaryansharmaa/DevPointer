import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes where no authentication is needed
const isPublicRoute = createRouteMatcher([
  "/", // Home page is public
  "/api/webhook", // Webhook should be accessible without authentication
  "/question/(.)", // Question details are public
  "/tags", // Listing of tags is public
  "/tags/(.)", // Specific tag details are public
  "/community", // Community page is public
  "/jobs",
  "/api/chatgpt", // Jobs listing is public
]);

export default clerkMiddleware((auth, req) => {
  // Protect routes that are not explicitly public
  if (!isPublicRoute(req)) {
    auth().protect(); // Redirect unauthenticated users to sign-in
  }
});

export const config = {
  matcher: ["/((?!...|_next).)", "/", "/(api|trpc)(.)"],
};
