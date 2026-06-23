export type ProjectEntry = {
  id: string;
  title: string;
  blurb: string;
  href?: string;
  tags: string[];
};

export type ProjectFolder = {
  id: string;
  name: string;
  projects: ProjectEntry[];
};

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    id: "web",
    name: "Web Apps",
    projects: [
      {
        id: "learning-journey-core",
        title: "Learning Journey Core",
        blurb: "This site — RedwoodSDK blog CMS + Win98 desktop on Cloudflare Workers.",
        href: "https://github.com/gracemorganmaxwell/learning-journey-core",
        tags: ["RedwoodSDK", "Cloudflare", "D1"],
      },
      {
        id: "folder-game",
        title: "Folder Game Challenge",
        blurb: "90s desktop UI game teaching file navigation.",
        href: "https://github.com/gracemorganmaxwell/FolderGameChallenge",
        tags: ["Next.js", "Game", "Education"],
      },
    ],
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    projects: [
      {
        id: "bluerose-migration",
        title: "Blue Rose Migration",
        blurb: "RedwoodJS → RedwoodSDK migration for a beauty business on Workers + D1.",
        tags: ["Workers", "D1", "Migration"],
      },
    ],
  },
  {
    id: "design",
    name: "Design & Experiments",
    projects: [
      {
        id: "retro-desktop",
        title: "Retro Desktop UI",
        blurb: "Vaporwave Win98 chrome, Pencil artboards, and pixel icons.",
        tags: ["UI", "Pencil", "Win98"],
      },
    ],
  },
];
