export const match = (what: string, where: string): boolean =>
  where.includes(what) && what[0] === where[0];
