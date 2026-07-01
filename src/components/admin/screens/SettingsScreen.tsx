"use client";

import type { SiteSettings } from "@/lib/cms/types";
import { MediaUploadField } from "@/components/admin/shared/MediaUploadField";
import { AdminButton, AdminSection } from "@/components/admin/ui";

type SettingsScreenProps = {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
  onResetDefault: () => void;
};

export function SettingsScreen({ settings, onChange, onResetDefault }: SettingsScreenProps) {
  return (
    <div className="max-w-xl">
      <AdminSection title="Логотип сайта">
        <MediaUploadField
          label="Логотип (шапка, подвал, контакты)"
          value={settings.logoUrl}
          onChange={(logoUrl) => onChange({ ...settings, logoUrl })}
          folder="logos/brand"
          hint="PNG или SVG с прозрачным фоном. Рекомендуемая ширина от 400px."
        />
        <div className="border-t border-slate-100 p-4">
          <AdminButton variant="secondary" onClick={onResetDefault}>
            Вернуть логотип по умолчанию
          </AdminButton>
        </div>
      </AdminSection>
    </div>
  );
}
