import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes - assuming you want to protect everything except explicitly mentioned public and ignored routes
const isProtectedRoute = createRouteMatcher([]);

// Define public routes - these routes will not require authentication
const isPublicRoute = createRouteMatcher([
  "/api/webhook", // Webhook endpoint
  "/question/(.*)", // Questions are public, capturing dynamic id
  "/tags", // Public listing of tags
  "/tags/(.*)", // Public tag details
  "/community", // Community page is public
  "/jobs", // Job listing is public
]);

export default clerkMiddleware((auth, req) => {
  // Apply protection only to protected routes and not to public or ignored routes
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
