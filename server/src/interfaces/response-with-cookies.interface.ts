import { CookieOptions } from 'express'

export interface ResponseWithCookies extends Response {
  cookie: (key: string, value: any, options?: CookieOptions) => void
}