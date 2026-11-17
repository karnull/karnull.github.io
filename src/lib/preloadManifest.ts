export type RoutePreloadBatch = {
  path: string;
  loadImages: () => Promise<string[]>;
};

const loadBackgroundImages = async () => {
  const [img1, img2] = await Promise.all([
    import("@/assets/me/7232.webp"),
    import("@/assets/me/7238.webp"),
  ]);

  return [img1.default, img2.default];
};

const loadCommunityImages = async () => {
  const images = await Promise.all([
    import("@/assets/community/GreekClub/committee1.webp"),
    import("@/assets/community/GreekClub/IMG_3497.webp"),
    import("@/assets/community/GreekClub/IMG_3503.webp"),
    import("@/assets/community/GreekClub/IMG_3578.webp"),
    import("@/assets/community/In2Science/finalist.webp"),
    import("@/assets/community/In2Science/group.webp"),
    import("@/assets/community/In2Science/student.webp"),
    import("@/assets/community/RoundSquare/DSC_0744.webp"),
    import("@/assets/community/RoundSquare/IMG_20180406_100611.webp"),
    import("@/assets/community/RoundSquare/IMG_20180409_110537.webp"),
    import("@/assets/community/RoundSquare/IMG_3408.webp"),
    import("@/assets/community/RoundSquare/IMG_3777.webp"),
    import("@/assets/community/RoundSquare/IMG_7347.webp"),
    import("@/assets/community/RoundSquare/m2.webp"),
    import("@/assets/community/RoundSquare/newspaper.webp"),
    import("@/assets/community/RoundSquare/thumbnail_IMG_0365.webp"),
  ]);

  return images.map((image) => image.default);
};

const loadOpenneticsImages = async () => {
  const images = await Promise.all([
    import("@/assets/opennetics/Logo.webp"),
    import("@/assets/opennetics/GestureTracker.webp"),
    import("@/assets/opennetics/PipPackage.webp"),
  ]);

  return images.map((image) => image.default);
};

const loadNoImages = async () => [];

export const routePreloadBatches: RoutePreloadBatch[] = [
  { path: "/background", loadImages: loadBackgroundImages },
  { path: "/codebase", loadImages: loadNoImages },
  { path: "/community", loadImages: loadCommunityImages },
  { path: "/opennetics", loadImages: loadOpenneticsImages },
  { path: "/journal", loadImages: loadNoImages },
  { path: "/writing/automation-and-purpose", loadImages: loadNoImages },
  { path: "/writing/withdrawing-from-grad-school", loadImages: loadNoImages },
  { path: "/dotfiles", loadImages: loadNoImages },
  { path: "/pgp", loadImages: loadNoImages },
];
