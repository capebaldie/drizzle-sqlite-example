export function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD") // split accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple -
}
