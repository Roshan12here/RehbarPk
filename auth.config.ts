import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

import type { NextAuthConfig } from "next-auth"
 
export default { providers: [GitHub, Google, FacebookProvider] } satisfies NextAuthConfig