"use client";

import { InfinitySceneLayer } from "@/components/ui/InfinitySceneLayer";
import { HOME_SCENES } from "@/lib/infinity-scenes";

export function InfinityScene() {
  return <InfinitySceneLayer shapes={HOME_SCENES} />;
}
