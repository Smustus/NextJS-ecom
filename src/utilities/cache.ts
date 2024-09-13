import { unstable_cache } from "next/cache"
import { cache as reactCache } from "react"

//https://react.dev/reference/react/cache#noun-labs-1201738-(2)
//https://nextjs.org/docs/app/building-your-application/caching

type CallBack = (...args: any[]) => Promise<any>

export function caching<T extends CallBack>(callback: T, keyParts: string[], options: {revalidate?: number | false; tags?: string[]} = {}){
 return unstable_cache(reactCache(callback), keyParts, options);
}
