import {dirname, join} from "node:path";

/**
 * Returns the normalized relative path from "/file/path/to/a" to
 * "/file/path/of/b". To make relative imports work, paths to the same directory
 * are prefixed with "./", and paths that start without a slash are considered
 * from the root.
 */
export function relativePath(source: string, target: string): string {
  if (/^\w+:/.test(target)) return target;
  const from = join("/", source).split(/[/]+/g).slice(0, -1);
  const to = join("/", target).split(/[/]+/g);
  const f = to.pop()!;
  const m = from.length;
  const n = Math.min(m, to.length);
  let i = 0;
  while (i < n && from[i] === to[i]) ++i;
  const k = m - i;
  return (k ? "../".repeat(k) : "./") + to.slice(i).concat(f).join("/");
}

/**
 * Returns the path to the specified target within the given source root, which
 * defaults to ".", assuming that the target is a relative path such as an
 * import or fetch from the specified source. Typically returns a path starting
 * with a slash (indicating that it is relative to the source root), but may
 * return a path start with dot-dot-slash (../) if the path goes outside the
 * specified root (e.g., from _import to _npm).
 */
export function resolvePath(source: string, target: string): string;
export function resolvePath(root: string, source: string, target: string): string;
export function resolvePath(root: string, source: string, target?: string): string {
  if (target === undefined) (target = source), (source = root), (root = ".");
  const path = join(root, target.startsWith("/") ? "." : dirname(source), target);
  return path.startsWith("../") ? path : `/${path}`;
}
