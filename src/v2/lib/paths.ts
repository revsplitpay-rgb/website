// Every internal v2 link goes through v2Path, so switching v2 to the live
// site is one constant change.
export const V2_BASE: string = "/v2";

export const v2Path = (path: string) => (path === "/" ? V2_BASE || "/" : `${V2_BASE}${path}`);
