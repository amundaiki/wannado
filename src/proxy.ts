import { NextResponse, type NextRequest } from "next/server";

const LOCAL_DEVELOPMENT_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function withPrivateStudioHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

function unauthorizedStudioResponse() {
  return withPrivateStudioHeaders(
    new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Wannado CMS", charset="UTF-8"',
      },
    })
  );
}

function isLocalDevelopment(request: NextRequest) {
  return (
    process.env.NODE_ENV !== "production" &&
    LOCAL_DEVELOPMENT_HOSTS.has(request.nextUrl.hostname)
  );
}

function getBasicCredentials(authorizationHeader: string | null) {
  if (!authorizationHeader?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(authorizationHeader.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  if (isLocalDevelopment(request)) {
    return NextResponse.next();
  }

  const expectedUsername = process.env.STUDIO_BASIC_AUTH_USER;
  const expectedPassword = process.env.STUDIO_BASIC_AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return withPrivateStudioHeaders(new NextResponse("Not found", { status: 404 }));
  }

  const credentials = getBasicCredentials(request.headers.get("authorization"));

  if (
    credentials?.username !== expectedUsername ||
    credentials.password !== expectedPassword
  ) {
    return unauthorizedStudioResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
