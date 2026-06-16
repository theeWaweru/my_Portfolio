import { NextResponse } from "next/server";

// Serves the Galentine proposal deck on its own subdomain.
// The deck is a single self-contained file at /public/galentine/index.html,
// so we just rewrite every request on the subdomain to that file.
export function middleware(request) {
  const host = (request.headers.get("host") || "").toLowerCase();

  if (host === "galentine.theewaweru.dev") {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/galentine")) {
      url.pathname = "/galentine/index.html";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // run on everything except Next internals
  matcher: ["/((?!_next|favicon.ico).*)"],
};
