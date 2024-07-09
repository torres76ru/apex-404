interface ApiReports {
  status: string;
  message: string;
  body: BodyItemReports[];
}
interface ApiReport {
  status: string;
  message: string;
  body: BodyItemReports;
}

interface BodyItemReports {
  _id: string;
  id: number;
  ownerUuid: string;
  userId: number;
  ownerUsername: string;
  questions: Question[];
  date: string;
  isClosed: boolean;
  photoUrl: string;
  __v: number;
}

interface Question {
  id: number;
  body: string;
  answer: string;
  _id: string;
}

interface ApiDay {
  status: string;
  message: string;
  body: string;
}

interface ApiPostFile {
  status: string;
  message: string;
  publicUrl: string;
}

interface ApiToken {
  status: string;
  message: string;
  body: string;
}

interface ApiStatus {
  status: string;
  message: string;
  body: string;
}

type ApiReportsResponse = ApiReports;
type ApiDayResponse = ApiDay;
type ApiReportResponse = ApiReport;
type ApiPostFileResponse = ApiPostFile;
type ApiTokenResponse = ApiToken;
type ApiStatusResponse = ApiStatus;
