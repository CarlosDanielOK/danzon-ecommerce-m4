import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl; // Obtener la ruta actual

    // Si el usuario intenta acceder a /dashboard o /cart y no tiene una cookie con los datos del usuario, redirigirlo a /login
    if ((pathname === "/dashboard" || pathname === "/cart" || pathname === "/protegido") && !request.cookies.get("userData")?.value) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Si el usuario intenta acceder a /login o /register y ya tiene una cookie con los datos del usuario, redirigirlo a /home
    if ((pathname === "/login" || pathname === "/register") && request.cookies.get("userData")?.value) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next(); // Continuar con la petición
}