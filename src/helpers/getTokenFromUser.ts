// import { NextRequest,NextResponse } from "next/server";
// import jwt from "jsonwebtoken"

// export const getTokenFromUser=(request:NextRequest)=>{
//     try {
//         const token=request.cookies.get('token')?.value||''

//         const secretKey="jsonwebtokensecretkeyin.envpresentunavailable";

//         const decodedToken:any=jwt.verify(token,secretKey)

//         return decodedToken.id
//     } catch (error:any) {
//         throw new Error(error.message)
//     }
// }
