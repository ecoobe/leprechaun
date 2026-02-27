"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";


export interface Tool {
  id: string;
  icon: React.ElementType;
  title: string;
  status: "active" | "soon" | "inactive";
}


interface SidebarProps {
  tools: Tool[];
  selectedToolId: string | null;
  onSelectTool: (id: string) => void;
}

// Карточка инструмента в сайдбаре
const ToolCard = ({
  icon: Icon,
  title,
  status = "inactive",
  isSelected,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  status?: "active" | "soon" | "inactive";
  isSelected: boolean;
  onClick?: () => void;
}) => {
  const isActive = status === "active";
  const isSoon = status === "soon";
  const canClick = isActive && !isSoon;

  return (
    <motion.div
      whileHover={canClick ? { x: 4 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        relative rounded-xl border p-4 backdrop-blur-sm transition-all cursor-pointer
        ${
          isSelected
            ? "border-emerald-500/60 bg-emerald-500/10 shadow-md shadow-emerald-500/10"
            : canClick
            ? "border-border bg-card hover:border-emerald-500/30 hover:bg-card/80"
            : "border-zinc-700/30 bg-zinc-800/20 opacity-60 cursor-not-allowed"
        }
      `}
      onClick={canClick ? onClick : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center shrink-0
            ${
              isSelected || isActive
                ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                : "bg-zinc-800/40"
            }
          `}
        >
          <Icon
            className={`w-5 h-5 ${
              isSelected || isActive ? "text-emerald-400" : "text-muted-foreground"
            }`}
          />
        </div>
        <span
          className={`font-medium ${
            isSelected || isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </span>
        {isSoon && (
          <span className="ml-auto text-xs bg-zinc-800/40 px-2 py-1 rounded-full text-muted-foreground">
            Скоро
          </span>
        )}
      </div>
    </motion.div>
  );
};

export function Sidebar({ tools, selectedToolId, onSelectTool }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card/80 backdrop-blur-xl border-r border-border p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard" className="block">
          <span className="logo-text text-2xl">leprechaun</span>
        </Link>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Инструменты</h2>
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-2">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              status={tool.status}
              isSelected={selectedToolId === tool.id}
              onClick={() => onSelectTool(tool.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}