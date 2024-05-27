import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Use a regex literal to match dynamic routes
const protectedRoutes = createRouteMatcher([
  "/ask-question",
  "/collection",
  "/community",
  "/profile",
  "/question",
  "/tags",
  /^\/question\/[^/]+$/  // Regex literal to match /question/[id] pattern
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
