import RegisterTemplate from "@/modules/account/templates/register-template";

export default async function RegisterPage(
  props: PageProps<"/[locale]/account/register">,
) {
  return <RegisterTemplate />;
}
