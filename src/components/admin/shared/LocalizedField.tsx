"use client";

import { useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/types";
import { localeFlag } from "@/lib/admin/utils";
import { IosSegmented } from "@/components/admin/ios/ui";

export function LocalizedField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
  multiline?: boolean;
}) {
  const [locale, setLocale] = useState<Locale>("ru");

  return (
    <div className="border-b border-[#C6C6C8]/40 px-4 py-3 last:border-b-0">
      <p className="mb-2 text-[13px] text-[#8E8E93]">{label}</p>
      <IosSegmented
        options={locales.map((l) => ({ value: l, label: `${localeFlag(l)} ${localeNames[l]}` }))}
        value={locale}
        onChange={setLocale}
      />
      {multiline ? (
        <textarea
          value={value[locale]}
          onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
          rows={4}
          className="mt-2 w-full resize-none rounded-lg bg-[#F2F2F7] px-3 py-2.5 text-[17px] outline-none"
        />
      ) : (
        <input
          value={value[locale]}
          onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
          className="mt-2 w-full rounded-lg bg-[#F2F2F7] px-3 py-2.5 text-[17px] outline-none"
        />
      )}
    </div>
  );
}
