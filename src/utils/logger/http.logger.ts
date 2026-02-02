export class HttpLogger {
    public static logError(client: string, response: any) {
        console.log(`[ ${client} ] | [ http.status ]:`, response.status);
        console.log(`[ ${client} ] | [ http.body ]:`, response.data);

        const { code, description } = response.data as { code?: string; description?: string } || {};

        if (code || description) {
            console.log(`[ ${client} ] | [ code ]: ${code}, [ description ]: ${description}`);
        }
    }

    public static logInfo(client: string, response: any) {
        console.info(`[ ${client} ] | [ http.status ]:`, response.status);
        console.info(`[ ${client} ] | [ http.body ]:`, response.data);
    }
}

export function decodeJwtPayload(token: string | null) {
  if (!token || !token.includes(".")) {
    console.warn("⚠️ Token inválido ou ausente.");
    return null;
  }

  const payload = token.split(".")[1];
  if (!payload) return null;

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");

  try {
    return JSON.parse(atob(padded));
  } catch (e) {
    console.error("❌ Erro ao decodificar token:", e);
    return null;
  }
}