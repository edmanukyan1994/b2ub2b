"use client";

import type { Locale } from "@/i18n/routing";
import { MESSAGE_SECTIONS } from "@/lib/admin/message-schema";
import { getByPath, setByPath } from "@/lib/admin/utils";
import { AdminField, AdminSection } from "@/components/admin/ui";

type MessagesEditorProps = {
  messages: Record<Locale, Record<string, unknown>>;
  sectionId: string;
  locale: Locale;
  onChange: (messages: Record<Locale, Record<string, unknown>>) => void;
};

export function MessagesSectionEditor({ messages, sectionId, locale, onChange }: MessagesEditorProps) {
  const section = MESSAGE_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return null;

  const current = messages[locale] ?? {};

  return (
    <AdminSection>
      {section.fields.map((field) => {
        const value = String(getByPath(current, field.path) ?? "");
        return (
          <AdminField
            key={field.path}
            label={field.label}
            value={value}
            onChange={(v) => {
              const nextLocale = setByPath(current, field.path, v);
              onChange({ ...messages, [locale]: nextLocale });
            }}
            multiline={field.multiline}
            hint={field.hint}
          />
        );
      })}
    </AdminSection>
  );
}

export { MESSAGE_SECTIONS };
