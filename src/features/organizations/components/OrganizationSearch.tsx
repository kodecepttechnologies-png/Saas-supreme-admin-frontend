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
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
};