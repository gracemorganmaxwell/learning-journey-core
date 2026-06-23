"use client";

import { useState } from "react";

import { icon, type DesktopWindowId } from "@/app/lib/icons";
import { PROJECT_FOLDERS } from "@/app/lib/projects";

import styles from "./FileManagerWindowContent.module.css";

type TreeNode = {
  id: string;
  label: string;
  iconSrc: string;
  children?: TreeNode[];
  opens?: DesktopWindowId;
};

const FILE_TREE: TreeNode[] = [
  {
    id: "my-computer",
    label: "My Computer",
    iconSrc: icon.folder,
    children: [
      {
        id: "learning-journey",
        label: "Learning Journey",
        iconSrc: icon.folder,
        children: [
          { id: "blog", label: "Blog", iconSrc: icon.blog, opens: "blog" },
          { id: "about", label: "About Me", iconSrc: icon.notepad, opens: "about" },
          {
            id: "credits",
            label: "Credits.txt",
            iconSrc: icon.textFile,
            opens: "credits",
          },
          {
            id: "weather",
            label: "Weather",
            iconSrc: icon.world,
            opens: "weather",
          },
          { id: "projects", label: "Projects", iconSrc: icon.folder },
        ],
      },
    ],
  },
];

type FileManagerWindowContentProps = {
  onOpenWindow: (id: DesktopWindowId) => void;
};

function collectItems(node: TreeNode): TreeNode[] {
  return node.children ?? [];
}

function addressPath(selectedId: string): string {
  if (selectedId === "projects") {
    return "My Computer / Learning Journey / Projects";
  }
  if (selectedId === "learning-journey") {
    return "My Computer / Learning Journey";
  }
  return "My Computer";
}

export function FileManagerWindowContent({
  onOpenWindow,
}: FileManagerWindowContentProps) {
  const [selectedId, setSelectedId] = useState("learning-journey");
  const [projectFolderId, setProjectFolderId] = useState(
    PROJECT_FOLDERS[0]?.id ?? "",
  );
  const selected = findNode(FILE_TREE, selectedId) ?? FILE_TREE[0]!.children![0]!;
  const items = collectItems(selected);
  const isProjectsView = selectedId === "projects";
  const projectFolder =
    PROJECT_FOLDERS.find((f) => f.id === projectFolderId) ?? PROJECT_FOLDERS[0];
  const projectCount = projectFolder?.projects.length ?? 0;

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Address:</span>
        <span className={styles.addressBar}>{addressPath(selectedId)}</span>
      </div>
      <div className={styles.panes}>
        <aside className={`${styles.tree} win98Scrollbar`}>
          {FILE_TREE.map((root) => (
            <TreeBranch
              key={root.id}
              node={root}
              depth={0}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </aside>
        {isProjectsView ? (
          <ProjectsPane
            folderId={projectFolderId}
            onSelectFolder={setProjectFolderId}
          />
        ) : (
          <div className={`${styles.listing} win98Scrollbar`}>
            {items.length === 0 ? (
              <p className={styles.empty}>This folder is empty.</p>
            ) : (
              <ul className={styles.fileList}>
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={styles.fileItem}
                      onDoubleClick={() => {
                        if (item.opens) onOpenWindow(item.opens);
                      }}
                      onClick={() => {
                        if (!item.opens) setSelectedId(item.id);
                      }}
                    >
                      <img
                        src={item.iconSrc}
                        alt=""
                        width={32}
                        height={32}
                        className={styles.fileIcon}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className={styles.statusBar}>
        {isProjectsView
          ? `${projectCount} project${projectCount === 1 ? "" : "s"}`
          : `${items.length} object${items.length === 1 ? "" : "s"}`}
      </div>
    </div>
  );
}

type ProjectsPaneProps = {
  folderId: string;
  onSelectFolder: (id: string) => void;
};

function ProjectsPane({ folderId, onSelectFolder }: ProjectsPaneProps) {
  const folder =
    PROJECT_FOLDERS.find((f) => f.id === folderId) ?? PROJECT_FOLDERS[0];

  return (
    <div className={styles.projectsPane}>
      <aside className={`${styles.projectFolders} win98Scrollbar`}>
        <p className={styles.projectFoldersLabel}>Folders</p>
        <ul className={styles.projectFolderList}>
          {PROJECT_FOLDERS.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className={`${styles.projectFolderItem} ${
                  f.id === folderId ? styles.projectFolderItemSelected : ""
                }`}
                onClick={() => onSelectFolder(f.id)}
              >
                <img src={icon.folder} alt="" width={16} height={16} />
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className={`${styles.projectCards} win98Scrollbar`}>
        <h3 className={styles.projectFolderTitle}>{folder?.name}</h3>
        <div className={styles.projectGrid}>
          {folder?.projects.map((p) => (
            <article key={p.id} className={styles.projectCard}>
              <div className={styles.projectCardHeader}>
                <img src={icon.textFile} alt="" width={24} height={24} />
                <div>
                  <h4 className={styles.projectCardTitle}>{p.title}</h4>
                  <p className={styles.projectCardBlurb}>{p.blurb}</p>
                </div>
              </div>
              <div className={styles.projectTags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.projectTag}>
                    {t}
                  </span>
                ))}
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  Open project
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

type TreeBranchProps = {
  node: TreeNode;
  depth: number;
  selectedId: string;
  onSelect: (id: string) => void;
};

function TreeBranch({ node, depth, selectedId, onSelect }: TreeBranchProps) {
  const isSelected = selectedId === node.id;
  return (
    <div className={styles.treeBranch}>
      <button
        type="button"
        className={`${styles.treeItem} ${isSelected ? styles.treeItemSelected : ""}`}
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => onSelect(node.id)}
      >
        <img src={node.iconSrc} alt="" width={16} height={16} />
        <span>{node.label}</span>
      </button>
      {node.children?.map((child) => (
        <TreeBranch
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
