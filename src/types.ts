export interface RSVPRecord {
  id: string;
  name: string;
  status: 'attending' | 'declined';
  dietary?: string;
  message?: string;
  timestamp: number;
}

export interface GuestbookWish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export interface GiftingDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: { label: string; value: string; copyable?: boolean }[];
}
