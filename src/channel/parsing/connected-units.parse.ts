import { IParseUnitsObject } from "./interface.parse";

export async function ParseConnectedUnits(
  previous: number[],
  patch: number[]
): Promise<IParseUnitsObject> {
  if (previous.length === 0 && patch.length === 0) {
    return { action: false };
  }

  if (previous.length === 0 && patch.length !== 0) {
    return { action: true, toConnect: patch };
  }

  if (previous.length !== 0 && patch.length === 0) {
    return { action: true, toDisconnect: previous };
  }

  const manage = {
    toConnect: patch.filter((value) => {
      if (!previous.includes(value)) {
        return value;
      }
    }),
    toDisconnect: previous.filter((value) => {
      if (!patch.includes(value)) {
        return value;
      }
    }),
  };

  if (manage.toConnect.length === 0 && manage.toDisconnect.length === 0) {
    return { action: false };
  }

  return { action: true, ...manage };
}
