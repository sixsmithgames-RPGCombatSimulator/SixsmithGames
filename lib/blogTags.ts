export function slugifyTag(tag: string): string {
  return tag
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '-')
    .replace(/-+/g, '-');
}

export function findTagBySlug(tagOrSlug: string, tags: string[]): string | undefined {
  return tags.find((tag) => tag === tagOrSlug || slugifyTag(tag) === tagOrSlug);
}

export function toTagRoute(tag: string): string {
  return `/blog/tag/${slugifyTag(tag)}`;
}
