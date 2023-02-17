import { Session } from "next-auth";

export type AuthSession = Session & { id_token: string }