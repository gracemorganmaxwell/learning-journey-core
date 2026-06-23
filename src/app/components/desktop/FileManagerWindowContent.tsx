"use client";

import { useState } from "react";

import { icon, type DesktopWindowId } from "@/app/lib/icons";

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

export function FileManagerWindowContent({
  onOpenWindow,
}: FileManagerWindowContentProps) {
  const [selectedId, setSelectedId] = useState("learning-journey");
  const selected = findNode(FILE_TREE, selectedId) ?? FILE_TREE[0]!.children![0]!;
  const items = collectItems(selected);

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Address:</span>
        <span className={styles.addressBar}>My Computer / Learning Journey</span>
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
      </div>
      <div className={styles.statusBar}>
        {items.length} object{items.length === 1 ? "" : "s"}
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
