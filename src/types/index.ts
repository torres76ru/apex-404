export interface tg_viewport {
  // Interface send by tg viewport_changed event
  height: number;
  is_state_stable: boolean;
  is_expanded: boolean;
}
export interface Question {
  id: number;
  body: string;
  answer: string;
  _id: string;
}

export interface Report {
  _id: string;
  id: number;
  ownerChatId: number;
  ownerUuid: string;
  questions: Question[];
  date: string;
  isClosed: boolean;
  __v: number;
}

export interface ApiResponse {
  status: string;
  message: string;
  reports: Report[];
}

export interface ApiResponseToken {
  status: string;
  message: string;
  body: string;
}
