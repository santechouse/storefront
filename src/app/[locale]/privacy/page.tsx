import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("PrivacyPolicy");

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black tracking-[-0.033em] mb-2">{t("title")}</h1>
      <p className="text-sm text-muted-foreground mb-10">{t("lastUpdated")}</p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section1Title")}</h2>
          <p>{t("section1Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section2Title")}</h2>
          <p>{t("section2Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section3Title")}</h2>
          <p>{t("section3Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section4Title")}</h2>
          <p>{t("section4Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section5Title")}</h2>
          <p>{t("section5Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section6Title")}</h2>
          <p>{t("section6Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("section7Title")}</h2>
          <p>{t("section7Body")}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t("contactTitle")}</h2>
          <p>{t("contactBody")}</p>
        </section>
      </div>
    </div>
  );
}
