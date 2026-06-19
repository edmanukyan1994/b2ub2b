"use client";

import { InfinitySceneLayer } from "@/components/ui/InfinitySceneLayer";
import { PAGE_SCENES, type InfinityVariant } from "@/lib/infinity-scenes";

export function PageInfinityScene({ variant }: { variant: InfinityVariant }) {
  return <InfinitySceneLayer shapes={PAGE_SCENES[variant]} />;
}
