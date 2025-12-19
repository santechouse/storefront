export const MEDUSA_LOCALE_HEADER = "x-medusa-locale";

const LANGUAGE_TO_LOCALE: Record<string, string> = {
  uz: "uz-Uz",
  ru: "ru-Ru",
};

export const getLocale = (lang: string, fallback: string = "ru-Ru") => {
  return LANGUAGE_TO_LOCALE[lang] ?? fallback;
};
