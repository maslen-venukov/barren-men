export interface RequestWithCookies extends Request {
  cookies: Record<string, any>
}