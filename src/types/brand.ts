export interface Brand {
  id: string;
  name: string;
  handle: string;
  is_active: boolean;
  images: Array<{ url: string }>;
}
