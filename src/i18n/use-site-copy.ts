import { useTranslation } from "react-i18next";

import type { CopyBundle } from "@/site/config";

export function useSiteCopy() {
  const { t } = useTranslation();

  return t("site", { returnObjects: true }) as CopyBundle;
}
