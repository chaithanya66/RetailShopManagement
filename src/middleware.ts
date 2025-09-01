import { url } from "inspector";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicpath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const userid = request.cookies.get("userid")?.value || "";

  if (isPublicpath && userid) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicpath && !userid) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/addproducts",
    "/verifyemail",
    "/dashboard",
    "/displayproducts",
  ],
};

// import { NextResponse } from "next/server";
// import { NechatchaxtRequest } from "next/server";

// export function middleware(request:NextRequest){
//     const path=request.nextUrl.pathname
//     const isPublic=path==='/login'||path==='/signup'
//     const token=request.cookies.get('token')?.value||''

//     if(isPublic&&token){
//         return NextResponse.redirect(new URL('/',request.nextUrl))
//     }

//     if(!isPublic&&!token){
//         return NextResponse.redirect(new URL('/login',request.nextUrl))
//     }
// }

// export const config={
//     matcher:[
//         '/',
//         '/login',
//         '/signup',
//         '/profile'
//     ]
// }
