import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/api/webhook", // Webhook endpoint
  "/question/:id", // Dynamic public questions route
  "/tags", // Public tags listing
  "/tags/:id", // Public tag details
  "/profile/:id", // Public profile details
  "/community", // Public community page
  "/jobs", // Public job listings
]);

export default clerkMiddleware((auth, req) => {
  // Check if the request route is one of the public routes
  if (!isPublicRoute(req)) {
    auth().protect(); // Protect all non-public routes
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
