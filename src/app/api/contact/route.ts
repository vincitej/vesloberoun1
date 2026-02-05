import { NextResponse } from "next/server";

/**
 * API route pro zpracování kontaktního formuláře
 * V produkci by odesílal email nebo ukládal do databáze
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validace
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím všechna povinná pole" },
        { status: 400 }
      );
    }

    // Zde by byla implementace odeslání emailu
    // Například pomocí Nodemailer, SendGrid, Resend.com, atd.
    console.log("Kontaktní formulář:", {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulace odeslání
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: "Zpráva byla úspěšně odeslána" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chyba při zpracování formuláře:", error);
    return NextResponse.json(
      { error: "Došlo k chybě při odesílání zprávy" },
      { status: 500 }
    );
  }
}
