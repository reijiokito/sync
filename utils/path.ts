import { joinURL } from 'ufo'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}
