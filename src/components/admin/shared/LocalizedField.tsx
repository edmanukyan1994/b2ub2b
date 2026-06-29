"use client";

import { useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/types";
import { localeFlag, ensureLocalized } from "@/lib/admin/utils";
import { AdminTabs } from "@/components/admin/ui";

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
  const safeValue = ensureLocalized(value);
  const inputClass =
    "mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  return (
    <div className="p-4">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <div className="mt-2">
        <AdminTabs
          options={locales.map((l) => ({ value: l, label: `${localeFlag(l)} ${localeNames[l]}` }))}
          value={locale}
          onChange={setLocale}
        />
      </div>
      {multiline ? (
        <textarea
          value={safeValue[locale]}
          onChange={(e) => onChange({ ...safeValue, [locale]: e.target.value })}
          rows={4}
          className={inputClass}
        />
      ) : (
        <input
          value={safeValue[locale]}
          onChange={(e) => onChange({ ...safeValue, [locale]: e.target.value })}
          className={inputClass}
        />
      )}
    </div>
  );
}
