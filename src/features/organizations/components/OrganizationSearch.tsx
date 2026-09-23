interface OrganizationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrganizationSearch = ({
  value,
  onChange,
}: OrganizationSearchProps) => {
  return (
    <div className="relative w-full lg:flex-1">
      <label
        htmlFor="organization-search"
        className="sr-only"
      >
        Search organizations
      </label>

      <input
        id="organization-search"
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search organizations..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
      />
    </div>
  );
};