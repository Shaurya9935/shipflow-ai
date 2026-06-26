import React from "react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-5 px-6 md:px-8 bg-card/40 backdrop-blur-sm sticky top-0 z-10 shrink-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground max-w-[600px] mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
