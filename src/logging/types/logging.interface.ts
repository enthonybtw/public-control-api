export interface LoggingRequestedData {
  method: string;
  route?: string;
  payload?: object;
  length?: string;
}

export interface LoggingReceivedData {
  statusCode: number;
  length?: string;
}

interface LoggingUserData {
  id?: number;
  token?: string;
}

export type LoggingUserDataType = LoggingUserData | null;
