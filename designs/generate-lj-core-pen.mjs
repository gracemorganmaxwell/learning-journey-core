import { writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

let seq = 0;
function uid() {
  return "lj" + randomBytes(3).toString("hex") + (seq++).toString(36);
}

const I = {
  logo: "../public/logo.png",
  favicon: "../public/favicon.ico",
  thisPc: "../public/icons/this_computer.png",
  notepad: "../public/icons/notepad.png",
  chrome: "../public/icons/chrome.png",
  briefcase: "../public/icons/briefcase.png",
  mail: "../public/icons/mail.png",
  calendar: "../public/icons/calendar.png",
  textFile: "../public/icons/text_file.png",
  folderClosed: "../public/icons/folder_closed.png",
  folderOpen: "../public/icons/folder_open.png",
};

const C = {
  purple: "#a855f7",
  pink: "#ec4899",
  blue: "#60a5fa",
  deepIndigo: "#1e1b4b",
  deepPurple: "#581c87",
  lightWash: "#faf5ff",
  lightPink: "#fce7f3",
  lavender: "#ede9fe",
  cream: "#fffff0",
  white: "#ffffff",
  dark: "#18181b",
  muted: "#71717a",
  error: "#dc2626",
  cfOrange: "#f38020",
  winGray: "#d8cce8",
  winFace: "#e9d5ff",
  bevelLight: "#ffffff",
  bevelShadow: "#7c6a9a",
  bevelDark: "#2e1065",
  titleInactive: "#a8a0b8",
  taskbarBg: "#d8cce8",
  selection: "#a855f7",
  zinc200: "#e4e4e7",
  zinc300: "#d4d4d8",
  zinc700: "#3f3f46",
  zinc800: "#27272a",
};

const F = {
  heading: "Playfair Display",
  body: "Lora",
  content: "Source Serif 4",
};

function img(url) {
  return { type: "image", enabled: true, url, mode: "fill" };
}

function outerGradient() {
  return {
    type: "gradient",
    gradientType: "linear",
    rotation: 180,
    colors: [
      { color: C.purple, position: 0 },
      { color: C.pink, position: 0.45 },
      { color: C.deepIndigo, position: 1 },
    ],
  };
}

function desktopGradient() {
  return {
    type: "gradient",
    gradientType: "linear",
    rotation: 135,
    colors: [
      { color: C.lightWash, position: 0 },
      { color: C.lightPink, position: 0.5 },
      { color: C.lavender, position: 1 },
    ],
  };
}

function titleBarGradient(active) {
  if (!active) return C.titleInactive;
  return {
    type: "gradient",
    gradientType: "linear",
    rotation: 90,
    colors: [
      { color: C.deepPurple, position: 0 },
      { color: C.purple, position: 0.45 },
      { color: C.pink, position: 0.75 },
      { color: C.blue, position: 1 },
    ],
  };
}

function raisedBevel(opts = {}) {
  const inner = {
    type: "frame",
    id: uid(),
    name: opts.innerName ?? "Raised Inner",
    layout: opts.layout ?? "vertical",
    width: opts.width ?? "fill_container",
    ...(opts.height ? { height: opts.height } : {}),
    fill: opts.fill ?? C.winGray,
    stroke: { thickness: { bottom: 2, right: 2 }, fill: C.bevelDark },
    gap: opts.gap,
    padding: opts.padding,
    alignItems: opts.alignItems,
    justifyContent: opts.justifyContent,
    children: opts.children ?? [],
  };
  return {
    type: "frame",
    id: uid(),
    name: opts.name ?? "Raised",
    layout: opts.layout ?? "vertical",
    width: opts.width,
    ...(opts.height ? { height: opts.height } : {}),
    fill: opts.fill ?? C.winGray,
    stroke: { thickness: { top: 2, left: 2 }, fill: C.bevelLight },
    padding: [2, 2, 0, 0],
    ...(opts.x !== undefined ? { x: opts.x } : {}),
    ...(opts.y !== undefined ? { y: opts.y } : {}),
    ...(opts.opacity !== undefined ? { opacity: opts.opacity } : {}),
    children: [inner],
  };
}

function sunkenField(children, opts = {}) {
  const inner = {
    type: "frame",
    id: uid(),
    name: "Sunken Inner",
    layout: opts.layout ?? "horizontal",
    width: opts.width ?? "fill_container",
    height: opts.height ?? 22,
    fill: opts.fill ?? C.white,
    stroke: { thickness: { bottom: 2, right: 2 }, fill: C.bevelLight },
    padding: opts.padding ?? [2, 6],
    alignItems: "center",
    gap: opts.gap,
    children,
  };
  return {
    type: "frame",
    id: uid(),
    name: opts.name ?? "Sunken Field",
    layout: "vertical",
    width: opts.width ?? "fill_container",
    stroke: { thickness: { top: 2, left: 2 }, fill: C.bevelShadow },
    padding: [2, 2, 0, 0],
    children: [inner],
  };
}

function grooveDivider() {
  return {
    type: "frame",
    id: uid(),
    name: "Groove",
    layout: "vertical",
    width: "fill_container",
    height: 4,
    padding: [1, 0],
    children: [
      {
        type: "rectangle",
        id: uid(),
        name: "Groove Top",
        width: "fill_container",
        height: 1,
        fill: C.bevelShadow,
      },
      {
        type: "rectangle",
        id: uid(),
        name: "Groove Bottom",
        width: "fill_container",
        height: 1,
        fill: C.bevelLight,
      },
    ],
  };
}

function txt(content, opts = {}) {
  return {
    type: "text",
    id: uid(),
    name: opts.name ?? "Text",
    fill: opts.fill ?? C.dark,
    content,
    fontFamily: opts.font ?? F.body,
    fontSize: opts.size ?? 12,
    ...(opts.weight ? { fontWeight: opts.weight } : {}),
    ...(opts.lh ? { lineHeight: opts.lh } : {}),
    ...(opts.growth ? { textGrowth: opts.growth } : {}),
    ...(opts.width ? { width: opts.width } : {}),
    ...(opts.underline ? { underline: true } : {}),
    ...(opts.align ? { textAlign: opts.align } : {}),
    ...(opts.letterSpacing ? { letterSpacing: opts.letterSpacing } : {}),
  };
}

function iconFrame(path, size = 32, name = "Icon") {
  return {
    type: "frame",
    id: uid(),
    name,
    width: size,
    height: size,
    fill: img(path),
    layout: "none",
  };
}

function win95Button(label, opts = {}) {
  return raisedBevel({
    name: opts.name ?? label,
    layout: "horizontal",
    width: opts.width,
    height: opts.height ?? 23,
    fill: opts.primary ? C.purple : C.winGray,
    padding: [2, 12, 4, 12],
    alignItems: "center",
    justifyContent: "center",
    children: [
      txt(label, {
        name: "Label",
        font: F.body,
        size: opts.size ?? 11,
        fill: opts.primary ? C.white : C.dark,
        weight: "600",
      }),
    ],
  });
}

function titleBarControl(label, danger = false) {
  return raisedBevel({
    name: label,
    width: 16,
    height: 14,
    fill: danger ? "#e879a9" : C.winGray,
    padding: [0, 0],
    alignItems: "center",
    justifyContent: "center",
    children: [
      txt(label, {
        name: "Glyph",
        font: F.content,
        size: label === "□" ? 8 : 10,
        fill: C.dark,
      }),
    ],
  });
}

function titleBar(title, iconPath, active = true) {
  return {
    type: "frame",
    id: uid(),
    name: "Title Bar",
    layout: "horizontal",
    width: "fill_container",
    height: 20,
    padding: [2, 2, 2, 4],
    gap: 4,
    alignItems: "center",
    fill: titleBarGradient(active),
    children: [
      iconFrame(iconPath, 16, "Window Icon"),
      txt(title, {
        name: "Title",
        font: F.heading,
        size: 11,
        fill: active ? C.white : "#f3f4f6",
        weight: "600",
      }),
      { type: "frame", id: uid(), name: "Spacer", width: "fill_container", height: 1 },
      titleBarControl("−"),
      titleBarControl("□"),
      titleBarControl("×", true),
    ],
  };
}

function osWindow({ title, iconPath, width = 360, contentHeight = 200, active = true, x, y, opacity = 1, contentChildren, contentFill = C.white }) {
  return raisedBevel({
    name: title,
    layout: "vertical",
    width,
    x,
    y,
    opacity,
    fill: C.winGray,
    padding: [2, 2, 4, 4],
    children: [
      {
        type: "frame",
        id: uid(),
        name: "Window Shell",
        layout: "vertical",
        width: "fill_container",
        clip: true,
        children: [
          titleBar(title, iconPath, active),
          {
            type: "frame",
            id: uid(),
            name: "Content",
            layout: "vertical",
            width: "fill_container",
            height: contentHeight,
            fill: contentFill,
            stroke: { thickness: { top: 1 }, fill: C.bevelShadow },
            children: contentChildren,
          },
        ],
      },
    ],
  });
}

function primaryBtn(label, opts = {}) {
  return win95Button(label, { ...opts, primary: true });
}

function startButton(pressed = false) {
  if (pressed) {
    return sunkenField(
      [
        iconFrame(I.logo, 16, "Start Logo"),
        txt("Start", { name: "Start", font: F.heading, size: 11, fill: C.dark, weight: "700" }),
      ],
      { name: "Start Button Pressed", width: 72, height: 22, layout: "horizontal", gap: 4, fill: C.winGray },
    );
  }
  return raisedBevel({
    name: "Start Button",
    layout: "horizontal",
    height: 22,
    fill: C.winGray,
    padding: [2, 8],
    gap: 4,
    alignItems: "center",
    children: [
      iconFrame(I.logo, 16, "Start Logo"),
      txt("Start", { name: "Start", font: F.heading, size: 11, fill: C.dark, weight: "700" }),
    ],
  });
}

function taskbarButton(title, iconPath, active = false) {
  const body = {
    type: "frame",
    id: uid(),
    name: title,
    layout: "horizontal",
    width: 154,
    height: 22,
    gap: 4,
    padding: [1, 6],
    alignItems: "center",
    fill: C.winGray,
    children: [
      iconFrame(iconPath, 16, "Task Icon"),
      txt(title, {
        name: "Task Title",
        font: F.body,
        size: 11,
        fill: C.dark,
        growth: "fixed-width",
        width: 120,
      }),
    ],
  };
  if (active) {
    return sunkenField(body.children, {
      name: title + " Active",
      width: 154,
      height: 22,
      layout: "horizontal",
      gap: 4,
      fill: C.winGray,
      padding: [1, 6],
    });
  }
  return raisedBevel({
    name: title,
    layout: "horizontal",
    width: 154,
    height: 22,
    fill: C.winGray,
    padding: [1, 6],
    gap: 4,
    alignItems: "center",
    children: [iconFrame(iconPath, 16, "Task Icon"), txt(title, { name: "Task Title", font: F.body, size: 11, fill: C.dark, growth: "fixed-width", width: 120 })],
  });
}

function startMenu(x = 2, y = 500) {
  const menuItems = shortcuts.map(([label, path]) => ({
    type: "frame",
    id: uid(),
    name: label,
    layout: "horizontal",
    width: "fill_container",
    height: 24,
    padding: [2, 8],
    gap: 8,
    alignItems: "center",
    fill: label === "Projects" ? C.selection : "transparent",
    children: [
      iconFrame(path, 24, "Menu Icon"),
      txt(label, { size: 11, fill: label === "Projects" ? C.white : C.dark, weight: label === "Projects" ? "600" : "normal" }),
      { type: "frame", id: uid(), name: "Arrow Spacer", width: "fill_container", height: 1 },
      ...(label === "Projects" ? [txt("▸", { name: "Arrow", size: 10, fill: C.muted })] : []),
    ],
  }));

  return raisedBevel({
    name: "Start Menu",
    x,
    y,
    layout: "horizontal",
    width: 240,
    fill: C.winGray,
    padding: [2, 2, 4, 4],
    children: [
      {
        type: "frame",
        id: uid(),
        name: "Menu Sidebar",
        layout: "vertical",
        width: 28,
        height: 280,
        fill: {
          type: "gradient",
          gradientType: "linear",
          rotation: 180,
          colors: [
            { color: C.deepPurple, position: 0 },
            { color: C.pink, position: 0.55 },
            { color: C.blue, position: 1 },
          ],
        },
        justifyContent: "end",
        alignItems: "center",
        padding: [8, 4],
        children: [
          txt("Learning Journey OS", {
            name: "Banner Text",
            font: F.heading,
            size: 11,
            fill: C.white,
            weight: "700",
            letterSpacing: 1,
          }),
        ],
      },
      {
        type: "frame",
        id: uid(),
        name: "Menu Items",
        layout: "vertical",
        width: "fill_container",
        padding: [4, 0],
        gap: 0,
        children: [
          ...menuItems,
          grooveDivider(),
          {
            type: "frame",
            id: uid(),
            name: "Shut Down",
            layout: "horizontal",
            width: "fill_container",
            height: 24,
            padding: [2, 8],
            gap: 8,
            alignItems: "center",
            children: [
              iconFrame(I.thisPc, 24, "Shutdown Icon"),
              txt("Shut Down...", { size: 11, fill: C.dark }),
            ],
          },
        ],
      },
    ],
  });
}

function taskbar({ tasks = [], startPressed = false }) {
  return {
    type: "frame",
    id: uid(),
    name: "Taskbar",
    layout: "horizontal",
    width: "fill_container",
    height: 28,
    padding: [2, 4],
    gap: 4,
    alignItems: "center",
    fill: C.taskbarBg,
    stroke: { thickness: { top: 2 }, fill: C.bevelLight },
    children: [
      startButton(startPressed),
      {
        type: "frame",
        id: uid(),
        name: "Tasks",
        layout: "horizontal",
        width: "fill_container",
        gap: 4,
        alignItems: "center",
        children: tasks.map(([title, path, active]) => taskbarButton(title, path, active)),
      },
      {
        type: "frame",
        id: uid(),
        name: "Tray",
        layout: "horizontal",
        height: 22,
        gap: 6,
        padding: [0, 8],
        alignItems: "center",
        stroke: { thickness: { left: 2 }, fill: C.bevelShadow },
        children: [
          iconFrame(I.favicon, 16, "Tray Icon"),
          txt("3:42 PM", { name: "Clock", font: F.content, size: 11, fill: C.dark }),
        ],
      },
    ],
  };
}

function shortcut(label, iconPath, x, y, hover = false) {
  return {
    type: "frame",
    id: uid(),
    name: label,
    x,
    y,
    layout: "vertical",
    width: 80,
    gap: 4,
    alignItems: "center",
    padding: [6, 4],
    ...(hover ? { fill: C.selection } : {}),
    children: [
      iconFrame(iconPath, 32, "Shortcut Icon"),
      txt(label, {
        name: "Label",
        font: F.body,
        size: 11,
        fill: hover ? C.white : C.dark,
        growth: "fixed-width",
        width: 72,
        align: "center",
      }),
    ],
  };
}

function monitorShell(workspaceChildren, taskbarNode) {
  return {
    type: "frame",
    id: uid(),
    name: "Monitor Bezel",
    layout: "vertical",
    width: 1280,
    height: 800,
    cornerRadius: 12,
    clip: true,
    fill: C.zinc800,
    stroke: { thickness: 2, fill: C.bevelLight },
    children: [
      {
        type: "frame",
        id: uid(),
        name: "Desktop Workspace",
        layout: "none",
        width: "fill_container",
        height: 772,
        fill: desktopGradient(),
        children: workspaceChildren,
      },
      taskbarNode,
    ],
  };
}

function screenFrame(name, x, y, children) {
  return {
    type: "frame",
    id: uid(),
    name,
    x,
    y,
    width: 1440,
    height: 900,
    clip: true,
    layout: "vertical",
    alignItems: "center",
    justifyContent: "center",
    fill: outerGradient(),
    children,
  };
}

const shortcuts = [
  ["Projects", I.thisPc],
  ["About Me", I.notepad],
  ["Blog", I.chrome],
  ["Resume", I.briefcase],
  ["Contact", I.mail],
  ["Learning Log", I.calendar],
  ["Credits.txt", I.textFile],
];

function desktopShortcuts(hoverFirst = false) {
  return shortcuts.map(([label, path], i) => {
    const sx = 24 + (i % 2) * 96;
    const sy = 24 + Math.floor(i / 2) * 100;
    return shortcut(label, path, sx, sy, hoverFirst && i === 0);
  });
}

// --- Screens ---

const componentSheet = {
  type: "frame",
  id: uid(),
  name: "Component Sheet",
  x: 0,
  y: 0,
  width: 420,
  height: 1400,
  clip: true,
  layout: "vertical",
  gap: 24,
  padding: 24,
  fill: C.deepIndigo,
  children: [
    txt("Components", { name: "Title", font: F.heading, size: 28, fill: C.white, letterSpacing: 2 }),
    txt("Win95 chrome — pink / purple / blue motif", { font: F.content, size: 11, fill: "#f9a8d4" }),
    win95Button("OK"),
    win95Button("OK", { primary: true }),
    startButton(false),
    startButton(true),
    taskbarButton("Blog — Chrome", I.chrome, true),
    taskbarButton("Projects — Explorer", I.thisPc, false),
    osWindow({
      title: "OsWindow — Active",
      iconPath: I.chrome,
      width: 340,
      contentHeight: 80,
      active: true,
      contentChildren: [txt("Raised outer border + gradient title bar", { font: F.content, size: 12, fill: C.muted })],
    }),
    osWindow({
      title: "OsWindow — Inactive",
      iconPath: I.notepad,
      width: 340,
      contentHeight: 80,
      active: false,
      contentChildren: [txt("Flat gray inactive caption", { font: F.content, size: 12, fill: C.muted })],
    }),
    startMenu(0, 0),
  ],
};

function otpBoxes(code = "482916") {
  return {
    type: "frame",
    id: uid(),
    name: "OTP Boxes",
    layout: "horizontal",
    gap: 6,
    children: code.split("").map((digit, i) =>
      flatField(digit, { name: "OTP " + (i + 1), width: 36, height: 40, align: "center", size: 16, weight: "600" }),
    ),
  };
}

function accessScreenFrame(name, x, y, children) {
  return {
    type: "frame",
    id: uid(),
    name,
    x,
    y,
    width: 1440,
    height: 900,
    clip: true,
    layout: "vertical",
    alignItems: "center",
    justifyContent: "center",
    fill: "#f3f4f6",
    children,
  };
}

function flatField(value, opts = {}) {
  return {
    type: "frame",
    id: uid(),
    name: opts.name ?? "Field",
    layout: "horizontal",
    width: opts.width ?? "fill_container",
    height: opts.height ?? 36,
    padding: [0, 12],
    fill: C.white,
    cornerRadius: 4,
    stroke: { thickness: 1, fill: C.zinc300 },
    alignItems: "center",
    justifyContent: opts.align === "center" ? "center" : "flex_start",
    children: [
      txt(value, {
        font: F.content,
        size: opts.size ?? 13,
        fill: opts.fill ?? C.dark,
        weight: opts.weight,
        align: opts.align,
      }),
    ],
  };
}

function cfButton(label, opts = {}) {
  return {
    type: "frame",
    id: uid(),
    name: opts.name ?? label,
    layout: "horizontal",
    width: opts.width ?? "fill_container",
    height: 40,
    padding: [2, 16, 4, 16],
    fill: opts.github ? "#24292f" : C.cfOrange,
    cornerRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    children: [
      ...(opts.github
        ? [
            {
              type: "frame",
              id: uid(),
              name: "GitHub Mark",
              width: 16,
              height: 16,
              fill: C.white,
              cornerRadius: 8,
              layout: "none",
            },
          ]
        : []),
      txt(label, { font: F.body, size: 13, fill: C.white, weight: "600" }),
    ],
  };
}

function accessOrDivider(label = "or") {
  return {
    type: "frame",
    id: uid(),
    name: "Or Divider",
    layout: "horizontal",
    width: "fill_container",
    gap: 12,
    alignItems: "center",
    children: [
      { type: "frame", id: uid(), name: "Line L", width: "fill_container", height: 1, fill: C.zinc300 },
      txt(label, { font: F.content, size: 11, fill: C.muted }),
      { type: "frame", id: uid(), name: "Line R", width: "fill_container", height: 1, fill: C.zinc300 },
    ],
  };
}

function accessHostedCard(bodyChildren) {
  return {
    type: "frame",
    id: uid(),
    name: "Access Hosted Card",
    layout: "vertical",
    width: 420,
    padding: 32,
    gap: 16,
    fill: C.white,
    cornerRadius: 8,
    stroke: { thickness: 1, fill: C.zinc300 },
    alignItems: "center",
    children: [
      {
        type: "frame",
        id: uid(),
        name: "CF Header",
        layout: "vertical",
        gap: 8,
        width: "fill_container",
        alignItems: "center",
        children: [
          {
            type: "frame",
            id: uid(),
            name: "CF Mark",
            width: 32,
            height: 32,
            fill: C.cfOrange,
            cornerRadius: 6,
            layout: "none",
          },
          txt("Learning Journey OS", { font: F.heading, size: 20, fill: C.dark, align: "center" }),
          txt("learning-journey-os.cloudflareaccess.com", { font: F.content, size: 10, fill: C.muted, align: "center" }),
        ],
      },
      ...bodyChildren,
      txt("Protected by Cloudflare Zero Trust • not rendered by the app (L21)", {
        font: F.content,
        size: 9,
        fill: C.muted,
        align: "center",
        growth: "fixed-width",
        width: "fill_container",
        lh: 1.4,
      }),
    ],
  };
}

function accessEmailStep() {
  return {
    type: "frame",
    id: uid(),
    name: "Email Step",
    layout: "vertical",
    gap: 8,
    width: "fill_container",
    children: [
      txt("Email address", { size: 11, weight: "600" }),
      flatField("grace@example.com"),
      cfButton("Send login code"),
    ],
  };
}

function accessGateCard(title, subtitle) {
  return accessHostedCard([
    txt(title, { font: F.heading, size: 18, fill: C.dark, align: "center" }),
    txt(subtitle, {
      font: F.content,
      size: 11,
      fill: C.muted,
      align: "center",
      growth: "fixed-width",
      width: "fill_container",
      lh: 1.45,
    }),
    cfButton("Sign in with GitHub", { github: true }),
    accessOrDivider("or get a one-time code"),
    accessEmailStep(),
  ]);
}

function authPolicyNote() {
  return {
    type: "frame",
    id: uid(),
    name: "Auth Policy Note",
    layout: "vertical",
    gap: 4,
    width: 420,
    alignItems: "center",
    padding: [12, 16],
    fill: "#18181b0d",
    cornerRadius: 4,
    stroke: { thickness: 1, fill: C.zinc300 },
    children: [
      txt("No public viewing yet — `/` frontend login + `/admin` backend/CMS login required", {
        font: F.content,
        size: 10,
        fill: C.dark,
        align: "center",
        growth: "fixed-width",
        width: "fill_container",
        lh: 1.4,
      }),
      txt("Cloudflare Access at L21 • GitHub and/or email OTP • localhost bypass in dev", {
        font: F.content,
        size: 9,
        fill: C.muted,
        align: "center",
        growth: "fixed-width",
        width: "fill_container",
        lh: 1.4,
      }),
    ],
  };
}

const frontendAccessGate = accessScreenFrame("01 Cloudflare Access — Frontend gate (/)", 480, 0, [
  {
    type: "frame",
    id: uid(),
    name: "Gate Stack",
    layout: "vertical",
    gap: 20,
    alignItems: "center",
    children: [
      accessGateCard("Sign in to enter desktop", "Frontend gate at `/` — desktop apps behind Access; public viewing not available yet"),
      authPolicyNote(),
    ],
  },
]);

const frontendAccessOtp = accessScreenFrame("01a Cloudflare Access — Frontend OTP (/)", 1960, 0, [
  accessHostedCard([
    txt("Check your email", { font: F.heading, size: 22, fill: C.dark, align: "center" }),
    txt("Enter the one-time code sent to grace@example.com", {
      font: F.content,
      size: 11,
      fill: C.muted,
      align: "center",
      growth: "fixed-width",
      width: "fill_container",
      lh: 1.45,
    }),
    otpBoxes(),
    cfButton("Sign in"),
    txt("Request new code", { font: F.content, size: 11, fill: C.purple, underline: true }),
    txt("Valid PIN → Access session JWT → `/desktop`", { font: F.content, size: 9, fill: C.muted, align: "center" }),
  ]),
]);

const accessGateScreen = accessScreenFrame("01b Cloudflare Access — Admin gate (/admin)", 3440, 0, [
  accessGateCard("Sign in to access admin", "Backend & CMS at `/admin` — solo-owner policy: GitHub or allowlisted email"),
]);

const accessOtpScreen = accessScreenFrame("01c Cloudflare Access — Admin OTP (/admin)", 4920, 0, [
  accessHostedCard([
    txt("Check your email", { font: F.heading, size: 22, fill: C.dark, align: "center" }),
    txt("Enter the one-time code sent to grace@example.com", {
      font: F.content,
      size: 11,
      fill: C.muted,
      align: "center",
      growth: "fixed-width",
      width: "fill_container",
      lh: 1.45,
    }),
    otpBoxes(),
    cfButton("Sign in"),
    txt("Request new code", { font: F.content, size: 11, fill: C.purple, underline: true }),
    txt("Valid PIN → Access session JWT → `/admin` shell", { font: F.content, size: 9, fill: C.muted, align: "center" }),
  ]),
]);

const desktopIdle = screenFrame("02 Desktop — Idle", 6400, 0, [
  monitorShell(desktopShortcuts(true), taskbar({ tasks: [] })),
]);

const desktopBusy = screenFrame("03 Desktop — Busy (3 windows)", 7880, 0, [
  monitorShell(
    [
      ...desktopShortcuts(),
      osWindow({
        title: "About Me — Notepad",
        iconPath: I.notepad,
        x: 180,
        y: 80,
        width: 400,
        contentHeight: 160,
        active: false,
        opacity: 0.85,
        contentFill: C.cream,
        contentChildren: [
          txt("Grace Morgan Maxwell\nFocus: Web apps, Cloudflare, design.", {
            font: F.content,
            size: 11,
            lh: 1.5,
            growth: "fixed-width",
            width: "fill_container",
          }),
        ],
      }),
      osWindow({
        title: "Projects — Explorer",
        iconPath: I.thisPc,
        x: 300,
        y: 130,
        width: 460,
        contentHeight: 200,
        active: false,
        opacity: 0.85,
        contentChildren: [
          {
            type: "frame",
            id: uid(),
            name: "Explorer",
            layout: "horizontal",
            width: "fill_container",
            height: "fill_container",
            children: [
              {
                type: "frame",
                id: uid(),
                name: "Tree",
                layout: "vertical",
                width: 110,
                height: "fill_container",
                fill: C.zinc200,
                padding: 8,
                gap: 6,
                children: [
                  {
                    type: "frame",
                    id: uid(),
                    name: "Folder",
                    layout: "horizontal",
                    gap: 6,
                    alignItems: "center",
                    children: [
                      iconFrame(I.folderClosed, 16),
                      txt("Web Apps", { size: 10 }),
                    ],
                  },
                  {
                    type: "frame",
                    id: uid(),
                    name: "Folder Open",
                    layout: "horizontal",
                    gap: 6,
                    alignItems: "center",
                    fill: "#a855f733",
                    padding: [2, 4],
                    cornerRadius: 2,
                    children: [
                      iconFrame(I.folderOpen, 16),
                      txt("Cloudflare", { size: 10, fill: C.purple }),
                    ],
                  },
                ],
              },
              {
                type: "frame",
                id: uid(),
                name: "Files",
                layout: "vertical",
                width: "fill_container",
                padding: 12,
                gap: 8,
                children: [
                  {
                    type: "frame",
                    id: uid(),
                    name: "File Row",
                    layout: "horizontal",
                    gap: 8,
                    alignItems: "center",
                    children: [
                      iconFrame(I.textFile, 24),
                      txt("learning-journey-os", { size: 11, weight: "600" }),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
      osWindow({
        title: "Blog — Chrome",
        iconPath: I.chrome,
        x: 440,
        y: 50,
        width: 520,
        contentHeight: 260,
        active: true,
        contentChildren: [
          {
            type: "frame",
            id: uid(),
            name: "Address Bar",
            layout: "horizontal",
            width: "fill_container",
            padding: 8,
            gap: 8,
            alignItems: "center",
            fill: C.zinc200,
            children: [
              iconFrame(I.favicon, 16, "Favicon"),
              txt("https://journey.os/blog/", { font: F.content, size: 10 }),
              primaryBtn("Go"),
            ],
          },
          {
            type: "frame",
            id: uid(),
            name: "Body",
            layout: "horizontal",
            width: "fill_container",
            height: "fill_container",
            children: [
              {
                type: "frame",
                id: uid(),
                name: "Posts",
                layout: "vertical",
                width: 140,
                padding: 8,
                gap: 6,
                fill: C.zinc200,
                children: [
                  {
                    type: "frame",
                    id: uid(),
                    name: "Selected",
                    layout: "vertical",
                    padding: 6,
                    fill: "#a855f733",
                    cornerRadius: 2,
                    gap: 2,
                    children: [
                      txt("Building LJ OS", { size: 10, fill: C.purple }),
                      txt("Jun 12, 2026", { font: F.content, size: 9, fill: C.muted }),
                    ],
                  },
                  txt("Workers deep dive", { size: 10, fill: C.muted }),
                ],
              },
              {
                type: "frame",
                id: uid(),
                name: "Article",
                layout: "vertical",
                width: "fill_container",
                padding: 16,
                gap: 8,
                children: [
                  txt("Building Learning Journey OS", { font: F.heading, size: 22, fill: C.dark }),
                  txt("A retro desktop portfolio on Cloudflare.", {
                    font: F.content,
                    size: 11,
                    lh: 1.5,
                    growth: "fixed-width",
                    width: "fill_container",
                  }),
                ],
              },
            ],
          },
        ],
      }),
      txt("↕ drag", { x: 450, y: 42, name: "Hint", font: F.content, size: 9, fill: C.muted }),
    ],
    taskbar({
      tasks: [
        ["Blog — Chrome", I.chrome, true],
        ["Projects — Explorer", I.thisPc, false],
        ["About Me — Notepad", I.notepad, false],
      ],
    }),
  ),
]);

const startMenuOpen = screenFrame("04 Desktop — Start Menu Open", 9360, 0, [
  monitorShell(
    [...desktopShortcuts().slice(0, 3), startMenu(2, 488)],
    taskbar({ tasks: [], startPressed: true }),
  ),
]);

const projectsApp = screenFrame("05 App — Projects (Explorer)", 0, 980, [
  osWindow({
    title: "Projects — File Explorer",
    iconPath: I.thisPc,
    width: 720,
    contentHeight: 400,
    contentChildren: [
      {
        type: "frame",
        id: uid(),
        name: "Layout",
        layout: "horizontal",
        width: "fill_container",
        height: "fill_container",
        children: [
          {
            type: "frame",
            id: uid(),
            name: "Tree",
            layout: "vertical",
            width: 180,
            height: "fill_container",
            fill: C.zinc200,
            padding: 12,
            gap: 8,
            children: [
              { type: "frame", id: uid(), name: "F1", layout: "horizontal", gap: 6, alignItems: "center", children: [iconFrame(I.folderClosed, 16), txt("Web Apps", { size: 11 })] },
              { type: "frame", id: uid(), name: "F2", layout: "horizontal", gap: 6, alignItems: "center", children: [iconFrame(I.folderOpen, 16), txt("Cloudflare", { size: 11 })] },
              { type: "frame", id: uid(), name: "F3", layout: "horizontal", gap: 6, alignItems: "center", fill: "#a855f733", padding: [4, 8], cornerRadius: 2, children: [iconFrame(I.folderOpen, 16), txt("Design", { size: 11, fill: C.purple })] },
            ],
          },
          {
            type: "frame",
            id: uid(),
            name: "Grid",
            layout: "vertical",
            width: "fill_container",
            padding: 16,
            gap: 12,
            children: [
              {
                type: "frame",
                id: uid(),
                name: "Card",
                layout: "vertical",
                width: "fill_container",
                padding: 12,
                gap: 8,
                stroke: { thickness: 1, fill: C.zinc300 },
                cornerRadius: 4,
                children: [
                  { type: "frame", id: uid(), name: "Row", layout: "horizontal", gap: 8, alignItems: "center", children: [iconFrame(I.textFile, 24), txt("learning-journey-os", { size: 13, weight: "600" })] },
                  txt("Win95-style portfolio on React + Cloudflare Workers.", { font: F.content, size: 10, lh: 1.4, growth: "fixed-width", width: "fill_container", fill: C.muted }),
                  txt("Open →", { font: F.content, size: 10, fill: C.purple, underline: true }),
                ],
              },
            ],
          },
        ],
      },
    ],
  }),
]);

const aboutApp = screenFrame("06 App — About Me (Notepad)", 1480, 980, [
  osWindow({
    title: "About Me — Notepad",
    iconPath: I.notepad,
    width: 560,
    contentHeight: 420,
    contentFill: C.cream,
    contentChildren: [
      txt(
        "Grace Morgan Maxwell\nDeveloper & designer building playful web experiences.\n\nFocus areas:\n• Full-stack web apps on Cloudflare\n• Design systems & retro UI\n\nSkills:\n• TypeScript, React, Workers, D1\n• Figma, Pencil, CSS",
        { font: F.content, size: 12, lh: 1.6, growth: "fixed-width", width: "fill_container" },
      ),
    ],
  }),
]);

const blogApp = screenFrame("07 App — Blog (Browser)", 2960, 980, [
  osWindow({
    title: "Blog — Chrome",
    iconPath: I.chrome,
    width: 800,
    contentHeight: 480,
    contentChildren: [
      {
        type: "frame",
        id: uid(),
        name: "Address",
        layout: "horizontal",
        width: "fill_container",
        padding: [8, 12],
        gap: 8,
        alignItems: "center",
        fill: C.zinc200,
        stroke: { thickness: { bottom: 1 }, fill: C.zinc300 },
        children: [
          iconFrame(I.favicon, 16),
          txt("https://journey.os/blog/", { font: F.content, size: 11 }),
          { type: "frame", id: uid(), name: "Slug", layout: "horizontal", width: 120, padding: [4, 8], stroke: { thickness: 1, fill: C.zinc300 }, children: [txt("building-lj-os", { font: F.content, size: 10, fill: C.muted })] },
          primaryBtn("Go"),
        ],
      },
      {
        type: "frame",
        id: uid(),
        name: "Reader",
        layout: "horizontal",
        width: "fill_container",
        height: "fill_container",
        children: [
          {
            type: "frame",
            id: uid(),
            name: "Sidebar",
            layout: "vertical",
            width: 200,
            padding: 12,
            gap: 8,
            fill: C.zinc200,
            children: [
              { type: "frame", id: uid(), name: "Sel", layout: "vertical", padding: 8, gap: 2, fill: "#a855f733", cornerRadius: 2, children: [txt("Building Learning Journey OS", { size: 11, fill: C.purple }), txt("Jun 12, 2026", { font: F.content, size: 9, fill: C.muted })] },
              { type: "frame", id: uid(), name: "P2", layout: "vertical", padding: 8, gap: 2, children: [txt("Workers deep dive", { size: 11 }), txt("May 28, 2026", { font: F.content, size: 9, fill: C.muted })] },
            ],
          },
          {
            type: "frame",
            id: uid(),
            name: "Article",
            layout: "vertical",
            width: "fill_container",
            padding: 24,
            gap: 12,
            children: [
              txt("Building Learning Journey OS", { font: F.heading, size: 32, letterSpacing: 1 }),
              txt("Published Jun 12, 2026", { font: F.content, size: 11, fill: C.muted }),
              txt("What if your portfolio felt like booting into Windows 95? Pink, purple, and blue vaporwave meets Cloudflare.", { font: F.content, size: 12, lh: 1.6, growth: "fixed-width", width: "fill_container" }),
              txt("Read the Workers docs →", { font: F.content, size: 12, fill: C.pink, underline: true }),
            ],
          },
        ],
      },
    ],
  }),
]);

const resumeApp = screenFrame("08 App — Resume (Briefcase)", 4440, 980, [
  osWindow({
    title: "Resume — Briefcase",
    iconPath: I.briefcase,
    width: 640,
    contentHeight: 480,
    contentChildren: [
      {
        type: "frame",
        id: uid(),
        name: "Doc",
        layout: "vertical",
        width: "fill_container",
        height: "fill_container",
        padding: 32,
        gap: 20,
        children: [
          txt("Grace Morgan Maxwell", { font: F.heading, size: 28, letterSpacing: 1 }),
          { type: "frame", id: uid(), name: "Exp", layout: "vertical", gap: 8, children: [txt("Experience", { font: F.heading, size: 18, fill: C.purple, underline: true }), txt("Senior Frontend Engineer — Acme Corp (2022–present)", { size: 12, weight: "600" }), txt("Led design systems and edge-deployed apps on Cloudflare Workers.", { font: F.content, size: 11, lh: 1.5, growth: "fixed-width", width: "fill_container", fill: C.muted })] },
          { type: "frame", id: uid(), name: "Edu", layout: "vertical", gap: 8, children: [txt("Education", { font: F.heading, size: 18, fill: C.purple, underline: true }), txt("B.S. Computer Science — State University", { font: F.content, size: 11 })] },
          { type: "frame", id: uid(), name: "Sk", layout: "vertical", gap: 8, children: [txt("Skills", { font: F.heading, size: 18, fill: C.purple, underline: true }), txt("TypeScript • React • Cloudflare Workers • D1 • Figma", { font: F.content, size: 11 })] },
        ],
      },
    ],
  }),
]);

const contactApp = screenFrame("09 App — Contact (Mail) — Error", 0, 1940, [
  osWindow({
    title: "Contact — Mail",
    iconPath: I.mail,
    width: 520,
    contentHeight: 440,
    contentChildren: [
      {
        type: "frame",
        id: uid(),
        name: "Header",
        layout: "vertical",
        width: "fill_container",
        padding: 24,
        gap: 4,
        fill: { type: "gradient", gradientType: "linear", rotation: 180, colors: [{ color: C.pink, position: 0 }, { color: C.purple, position: 1 }] },
        children: [
          txt("Get in touch", { font: F.heading, size: 24, fill: C.white }),
          txt("Send a message — opens your mail client", { font: F.content, size: 11, fill: "#fce7f3" }),
        ],
      },
      {
        type: "frame",
        id: uid(),
        name: "Form",
        layout: "vertical",
        width: "fill_container",
        padding: 24,
        gap: 16,
        children: [
          { type: "frame", id: uid(), name: "Email Field", layout: "vertical", gap: 4, children: [txt("Email", { size: 11, weight: "600" }), { type: "frame", id: uid(), name: "Input", layout: "horizontal", width: "fill_container", height: 36, padding: [0, 12], alignItems: "center", stroke: { thickness: 2, fill: C.error }, children: [txt("not-an-email", { font: F.content, size: 12 })] }, txt("Please enter a valid email address.", { font: F.content, size: 10, fill: C.error })] },
          { type: "frame", id: uid(), name: "Actions", layout: "horizontal", gap: 12, alignItems: "center", children: [primaryBtn("Send via Mail"), txt("grace@example.com", { font: F.content, size: 11, fill: C.purple, underline: true })] },
        ],
      },
    ],
  }),
]);

const learningLogApp = screenFrame("10 App — Learning Log (Calendar)", 1480, 1940, [
  osWindow({
    title: "Learning Log — Calendar",
    iconPath: I.calendar,
    width: 560,
    contentHeight: 460,
    contentChildren: [
      {
        type: "frame",
        id: uid(),
        name: "Timeline",
        layout: "vertical",
        width: "fill_container",
        height: "fill_container",
        padding: 24,
        stroke: { thickness: { left: 2 }, fill: C.purple },
        padding: [24, 24, 24, 32],
        gap: 24,
        children: [
          { type: "frame", id: uid(), name: "E1", layout: "vertical", gap: 6, children: [txt("Jun 20, 2026", { font: F.content, size: 10, fill: C.muted }), txt("Shipped desktop shell", { font: F.heading, size: 18 }), txt("Window manager, taskbar, and draggable chrome working in React.", { font: F.content, size: 11, lh: 1.5, growth: "fixed-width", width: "fill_container", fill: C.muted }), { type: "frame", id: uid(), name: "Tag", padding: [2, 8], fill: "#f9a8d466", cornerRadius: 4, children: [txt("React", { font: F.content, size: 9, fill: C.deepPurple })] }] },
          { type: "frame", id: uid(), name: "E2", layout: "vertical", gap: 6, children: [txt("Jun 8, 2026", { font: F.content, size: 10, fill: C.muted }), txt("Pencil design system", { font: F.heading, size: 18 }), txt("Pink-purple-blue palette with real pixel icons.", { font: F.content, size: 11, lh: 1.5, growth: "fixed-width", width: "fill_container", fill: C.muted })] },
        ],
      },
    ],
  }),
]);

const creditsApp = screenFrame("11 App — Credits.txt (Notepad)", 2960, 1940, [
  osWindow({
    title: "Credits.txt — Notepad",
    iconPath: I.textFile,
    width: 520,
    contentHeight: 360,
    contentFill: C.cream,
    contentChildren: [
      txt(
        "CREDITS.TXT\n\nDesktop icons by aconfuseddragon\nWindows 95 +PLUS+ Pack #1 & #2\n32×32 pixel art, CC BY 4.0\n\nhttps://aconfuseddragon.itch.io/\n\n---\nLearning Journey OS\nGrace Morgan Maxwell",
        { font: F.content, size: 12, lh: 1.7, growth: "fixed-width", width: "fill_container" },
      ),
    ],
  }),
]);

function adminSidebar(active) {
  return {
    type: "frame",
    id: uid(),
    name: "Sidebar",
    layout: "vertical",
    width: 220,
    height: "fill_container",
    padding: 24,
    gap: 8,
    fill: C.white,
    stroke: { thickness: { right: 1 }, fill: C.zinc300 },
    children: [
      { type: "frame", id: uid(), name: "Brand", layout: "horizontal", gap: 8, alignItems: "center", children: [iconFrame(I.logo, 28, "Logo"), txt("LJ OS Admin", { font: F.heading, size: 20 })] },
      ...["Posts", "Contact inbox"].map((item) => ({
        type: "frame",
        id: uid(),
        name: item,
        layout: "horizontal",
        width: "fill_container",
        padding: [10, 12],
        cornerRadius: 4,
        fill: item === active ? "#a855f733" : "transparent",
        children: [txt(item, { size: 12, fill: item === active ? C.purple : C.muted })],
      })),
    ],
  };
}

function adminFrame(name, x, y, active, mainChildren) {
  return {
    type: "frame",
    id: uid(),
    name,
    x,
    y,
    width: 1440,
    height: 900,
    clip: true,
    layout: "horizontal",
    fill: C.lightWash,
    children: [adminSidebar(active), { type: "frame", id: uid(), name: "Main", layout: "vertical", width: "fill_container", height: "fill_container", padding: 40, gap: 20, children: mainChildren }],
  };
}

const adminDash = adminFrame("12 Admin — Dashboard (/admin)", 4440, 1940, "Posts", [
  txt("Welcome back, Grace", { font: F.heading, size: 36 }),
  txt("Authenticated via Cloudflare Access • session active", { font: F.content, size: 13, fill: C.muted }),
  {
    type: "frame",
    id: uid(),
    name: "Stats",
    layout: "horizontal",
    width: "fill_container",
    gap: 16,
    children: [["Posts", "12"], ["Drafts", "2"], ["Messages", "5"]].map(([label, val]) => ({
      type: "frame",
      id: uid(),
      name: label,
      layout: "vertical",
      width: "fill_container",
      padding: 20,
      gap: 4,
      fill: C.white,
      cornerRadius: 8,
      stroke: { thickness: 1, fill: C.zinc300 },
      children: [txt(label, { size: 12, fill: C.muted }), txt(val, { font: F.heading, size: 32, fill: C.purple })],
    })),
  },
]);

const adminPosts = adminFrame("13 Admin — Posts (/admin/posts)", 0, 2900, "Posts", [
  { type: "frame", id: uid(), name: "Header", layout: "horizontal", width: "fill_container", justifyContent: "space_between", alignItems: "center", children: [txt("Posts", { font: F.heading, size: 32 }), primaryBtn("New post")] },
  {
    type: "frame",
    id: uid(),
    name: "Table",
    layout: "vertical",
    width: "fill_container",
    fill: C.white,
    cornerRadius: 8,
    stroke: { thickness: 1, fill: C.zinc300 },
    clip: true,
    children: [
      { type: "frame", id: uid(), name: "Head", layout: "horizontal", width: "fill_container", padding: [12, 16], fill: C.zinc200, gap: 16, children: ["Title", "Slug", "Status", "Edit"].map((h) => ({ type: "frame", id: uid(), name: h, width: h === "Edit" ? 80 : "fill_container", children: [txt(h, { size: 11, fill: C.muted, weight: "600" })] })) },
      ...[
        ["Building LJ OS", "building-lj-os", "Published", "#22c55e33", "#15803d"],
        ["Workers deep dive", "workers-deep-dive", "Draft", "#fbbf2433", "#b45309"],
      ].map(([title, slug, status, bg, fg]) => ({
        type: "frame",
        id: uid(),
        name: title,
        layout: "horizontal",
        width: "fill_container",
        padding: [12, 16],
        gap: 16,
        stroke: { thickness: { top: 1 }, fill: C.zinc300 },
        alignItems: "center",
        children: [
          { type: "frame", id: uid(), name: "T", width: "fill_container", children: [txt(title, { size: 12, weight: "600" })] },
          { type: "frame", id: uid(), name: "S", width: "fill_container", children: [txt(slug, { font: F.content, size: 11, fill: C.muted })] },
          { type: "frame", id: uid(), name: "St", width: "fill_container", children: [{ type: "frame", id: uid(), name: "Badge", padding: [2, 8], fill: bg, cornerRadius: 4, children: [txt(status, { font: F.content, size: 9, fill: fg })] }] },
          { type: "frame", id: uid(), name: "E", width: 80, children: [txt("Edit", { font: F.content, size: 11, fill: C.purple })] },
        ],
      })),
    ],
  },
]);

const adminNewPost = adminFrame("14 Admin — New Post (/admin/posts/new)", 1480, 2900, "Posts", [
  txt("New post", { font: F.heading, size: 32 }),
  {
    type: "frame",
    id: uid(),
    name: "Form",
    layout: "vertical",
    width: 720,
    gap: 16,
    fill: C.white,
    padding: 24,
    cornerRadius: 8,
    stroke: { thickness: 1, fill: C.zinc300 },
    children: [
      ...[["Title", "Building Learning Journey OS"], ["Slug", "building-lj-os"], ["Excerpt", "A retro desktop portfolio..."]].map(([label, val]) => ({
        type: "frame",
        id: uid(),
        name: label,
        layout: "vertical",
        gap: 4,
        children: [txt(label, { size: 11, weight: "600" }), { type: "frame", id: uid(), name: "Input", layout: "horizontal", width: "fill_container", height: 36, padding: 12, stroke: { thickness: 1, fill: C.zinc300 }, children: [txt(val, { font: F.content, size: 12, fill: C.muted })] }],
      })),
      { type: "frame", id: uid(), name: "Markdown", layout: "vertical", gap: 4, children: [txt("Markdown body", { size: 11, weight: "600" }), { type: "frame", id: uid(), name: "Area", layout: "vertical", width: "fill_container", height: 160, padding: 12, stroke: { thickness: 1, fill: C.zinc300 }, children: [txt("# Building Learning Journey OS\n\nPink-purple-blue vaporwave desktop.", { font: F.content, size: 11, lh: 1.5, growth: "fixed-width", width: "fill_container", fill: C.muted })] }] },
      { type: "frame", id: uid(), name: "Publish", layout: "horizontal", gap: 12, alignItems: "center", children: [{ type: "frame", id: uid(), name: "Toggle", width: 40, height: 22, cornerRadius: 11, fill: C.purple, children: [{ type: "ellipse", id: uid(), name: "Knob", x: 20, y: 2, width: 18, height: 18, fill: C.white }] }, txt("Publish", { size: 12, weight: "600" }), { type: "frame", id: uid(), name: "Sp", width: "fill_container", height: 1 }, primaryBtn("Save post")] },
    ],
  },
]);

const adminContact = adminFrame("15 Admin — Contact (/admin/contact)", 2960, 2900, "Contact inbox", [
  txt("Contact inbox", { font: F.heading, size: 32 }),
  {
    type: "frame",
    id: uid(),
    name: "List",
    layout: "vertical",
    width: "fill_container",
    gap: 8,
    children: [
      ["Alex Kim", "alex@studio.io", "Jun 21", "Interested in collaborating on a Workers app..."],
      ["Sam Rivera", "sam@dev.co", "Jun 18", "Loved the retro desktop portfolio concept!"],
    ].map(([name, email, date, preview]) => ({
      type: "frame",
      id: uid(),
      name,
      layout: "vertical",
      width: "fill_container",
      padding: 16,
      gap: 6,
      fill: C.white,
      cornerRadius: 8,
      stroke: { thickness: 1, fill: C.zinc300 },
      children: [
        { type: "frame", id: uid(), name: "Row", layout: "horizontal", width: "fill_container", justifyContent: "space_between", children: [txt(name, { size: 13, weight: "600" }), txt(date, { font: F.content, size: 10, fill: C.muted })] },
        txt(email, { font: F.content, size: 11, fill: C.purple }),
        txt(preview, { font: F.content, size: 11, lh: 1.4, growth: "fixed-width", width: "fill_container", fill: C.muted }),
      ],
    })),
  },
]);

const legend = {
  type: "frame",
  id: uid(),
  name: "16 Interaction Legend",
  x: 4440,
  y: 2900,
  width: 560,
  height: 900,
  clip: true,
  layout: "vertical",
  padding: 24,
  gap: 16,
  fill: C.deepIndigo,
  children: [
    txt("Interaction Legend", { font: F.heading, size: 28, fill: C.white, letterSpacing: 2 }),
    ...[
      ["Sign in at `/`", "Frontend Access gate — owner login only; no public viewing yet"],
      ["Visit `/admin`", "Backend/CMS Access gate — separate application policy (L21)"],
      ["Sign in with GitHub", "Identity provider when on Allow policy"],
      ["Send login code", "Access emails OTP for allowlisted email"],
      ["Sign in (OTP)", "Valid PIN → Access JWT → `/desktop` or `/admin` shell"],
      ["Double-click shortcut", "Opens window centered, brings to front"],
      ["Click taskbar button", "Toggle focus / minimize (sunken bevel = active window)"],
      ["Start menu item", "Opens same as shortcut; Start stays pressed while open"],
      ["/blog/:slug deep link", "Desktop + Blog open on that post"],
    ].map(([action, behavior]) => ({
      type: "frame",
      id: uid(),
      name: action,
      layout: "vertical",
      width: "fill_container",
      gap: 4,
      padding: [8, 0],
      stroke: { thickness: { bottom: 1 }, fill: C.bevelShadow },
      children: [txt(action, { size: 12, fill: C.pink }), txt(behavior, { font: F.content, size: 10, lh: 1.4, growth: "fixed-width", width: "fill_container", fill: C.white })],
    })),
    {
      type: "frame",
      id: uid(),
      name: "Responsive",
      layout: "vertical",
      width: "fill_container",
      gap: 8,
      padding: 12,
      fill: "#a855f766",
      cornerRadius: 4,
      children: [
        txt("Responsive", { font: F.heading, size: 16, fill: "#f9a8d4" }),
        ...["≥1024px: full desktop experience", "Tablet: shortcuts wrap; taskbar scrolls", "Mobile: full-screen one window (future)"].map((n) =>
          txt("• " + n, { font: F.content, size: 10, lh: 1.4, growth: "fixed-width", width: "fill_container", fill: C.white }),
        ),
      ],
    },
  ],
};

const document = {
  version: "2.9",
  children: [
    componentSheet,
    frontendAccessGate,
    frontendAccessOtp,
    accessGateScreen,
    accessOtpScreen,
    desktopIdle,
    desktopBusy,
    startMenuOpen,
    projectsApp,
    aboutApp,
    blogApp,
    resumeApp,
    contactApp,
    learningLogApp,
    creditsApp,
    adminDash,
    adminPosts,
    adminNewPost,
    adminContact,
    legend,
  ],
};

const outPath = new URL("./learning-journey-core.pen", import.meta.url);
writeFileSync(outPath, JSON.stringify(document, null, 2) + "\n");
console.log("Wrote", outPath.pathname, "with", document.children.length, "artboards");
