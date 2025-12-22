export interface BasePayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Media extends BasePayload {
  alt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export interface Banner extends BasePayload {
  link: string;
  image: Media;
  isActive?: boolean | null;
  startDate: string;
  endDate: string;
}

export interface PayloadProduct extends BasePayload {
  medusa_id: string;
  title: string;
  subtitle?: string | null;
  description?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  seo?: {
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
  };
  options?:
    | {
        title: string;
        medusa_id: string;
        id?: string | null;
      }[]
    | null;
  variants?:
    | {
        title: string;
        medusa_id: string;
        option_values?:
          | {
              medusa_id: string;
              medusa_option_id: string;
              value: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
}

export interface FeaturedBrands extends BasePayload {
  title: string;
  brands: Array<{
    name: string;
    logo: Media;
    link: string;
  }>;
}
