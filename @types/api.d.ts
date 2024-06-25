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
  photoName: string;
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

type ApiReportsResponse = ApiReports;
type ApiDayResponse = ApiDay;
type ApiReportResponse = ApiReport;
