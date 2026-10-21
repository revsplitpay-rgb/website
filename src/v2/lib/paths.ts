// Every internal link goes through v2Path. The redesign was previewed at /v2;
// since the switchover (2026-10-21) it is served at the site root.
export const V2_BASE: string = "";

export const v2Path = (path: string) => (path === "/" ? V2_BASE || "/" : `${V2_BASE}${path}`);
