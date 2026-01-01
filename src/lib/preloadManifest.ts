export type RoutePreloadBatch = {
  path: string;
  loadImages: () => Promise<string[]>;
};

const loadBackgroundImages = async () => {
  const [img1, img2] = await Promise.all([
    import("@/assets/me/7232.jpg"),
    import("@/assets/me/7238.jpg"),
  ]);

  return [img1.default, img2.default];
};

const loadCommunityImages = async () => {
  const images = await Promise.all([
    import("@/assets/community/GreekClub/committee1.jpg"),
    import("@/assets/community/GreekClub/IMG_3497.png"),
    import("@/assets/community/GreekClub/IMG_3503.png"),
    import("@/assets/community/GreekClub/IMG_3578.png"),
    import("@/assets/community/In2Science/finalist.png"),
    import("@/assets/community/In2Science/group.jpg"),
    import("@/assets/community/In2Science/student.jpg"),
    import("@/assets/community/RoundSquare/DSC_0744.jpg"),
    import("@/assets/community/RoundSquare/IMG_20180406_100611.jpg"),
    import("@/assets/community/RoundSquare/IMG_20180409_110537.jpg"),
    import("@/assets/community/RoundSquare/IMG_3408.jpg"),
    import("@/assets/community/RoundSquare/IMG_3777.jpg"),
    import("@/assets/community/RoundSquare/IMG_7347.jpg"),
    import("@/assets/community/RoundSquare/m2.jpg"),
    import("@/assets/community/RoundSquare/newspaper.png"),
    import("@/assets/community/RoundSquare/thumbnail_IMG_0365.jpg"),
  ]);

  return images.map((image) => image.default);
};

const loadOpenneticsImages = async () => {
  const images = await Promise.all([
    import("@/assets/opennetics/Logo.png"),
    import("@/assets/opennetics/GestureTracker.png"),
    import("@/assets/opennetics/PipPackage.png"),
  ]);

  return images.map((image) => image.default);
};

const loadNoImages = async () => [];

export const routePreloadBatches: RoutePreloadBatch[] = [
  { path: "/background", loadImages: loadBackgroundImages },
  { path: "/codebase", loadImages: loadNoImages },
  { path: "/community", loadImages: loadCommunityImages },
  { path: "/opennetics", loadImages: loadOpenneticsImages },
  { path: "/certifications", loadImages: loadNoImages },
  { path: "/journal", loadImages: loadNoImages },
  { path: "/writing/automation-and-purpose", loadImages: loadNoImages },
  { path: "/writing/withdrawing-from-grad-school", loadImages: loadNoImages },
  { path: "/dotfiles", loadImages: loadNoImages },
  { path: "/pgp", loadImages: loadNoImages },
];
