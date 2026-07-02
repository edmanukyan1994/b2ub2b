"use client";

import type { SiteSettings } from "@/lib/cms/types";
import { DEFAULT_HERO_STATS } from "@/lib/cms/types";
import { MediaUploadField } from "@/components/admin/shared/MediaUploadField";
import { AdminButton, AdminField, AdminSection } from "@/components/admin/ui";

type SettingsScreenProps = {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
  onResetDefault: () => void;
};

export function SettingsScreen({ settings, onChange, onResetDefault }: SettingsScreenProps) {
  const updateStat = (key: keyof SiteSettings["heroStats"], value: string) => {
    onChange({
      ...settings,
      heroStats: { ...settings.heroStats, [key]: value },
    });
  };

  return (
    <div className="max-w-xl space-y-6">
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

      <AdminSection title="Цифры в hero-блоке">
        <p className="border-b border-slate-100 px-4 py-3 text-sm text-slate-500">
          Подписи («Лет», «Проектов» и т.д.) редактируются в разделе «Тексты → Главный экран» для каждого языка.
        </p>
        <AdminField
          label="Лет опыта"
          value={settings.heroStats.years}
          onChange={(years) => updateStat("years", years)}
          hint="Например: 12+"
        />
        <AdminField
          label="Проектов"
          value={settings.heroStats.projects}
          onChange={(projects) => updateStat("projects", projects)}
          hint="Например: 150+"
        />
        <AdminField
          label="Стран"
          value={settings.heroStats.countries}
          onChange={(countries) => updateStat("countries", countries)}
          hint="Например: 8+"
        />
        <AdminField
          label="Направлений"
          value={settings.heroStats.services}
          onChange={(services) => updateStat("services", services)}
          hint="Например: 7"
        />
        <div className="border-t border-slate-100 p-4">
          <AdminButton
            variant="secondary"
            onClick={() => onChange({ ...settings, heroStats: { ...DEFAULT_HERO_STATS } })}
          >
            Вернуть цифры по умолчанию
          </AdminButton>
        </div>
      </AdminSection>
    </div>
  );
}
