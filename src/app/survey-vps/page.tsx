import { redirect } from "next/navigation";

export default async function SurveyVpsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    }
  }

  const query = params.toString();
  redirect(query ? `/isp-vps?${query}` : "/isp-vps");
}
