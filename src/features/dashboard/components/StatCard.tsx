interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  icon: React.ReactNode;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5e94db]/10 text-[#5e94db]">
          {icon}
        </div>
      </div>
    </div>
  );
};