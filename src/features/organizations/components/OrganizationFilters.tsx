interface OrganizationFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrganizationFilters = ({
  value,
  onChange,
}: OrganizationFiltersProps) => {
  return (
    <div className="w-full lg:w-48">
      <label
        htmlFor="organization-status-filter"
        className="sr-only"
      >
        Filter organizations by status
      </label>

      <select
        id="organization-status-filter"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#5e94db] focus:ring-2 focus:ring-[#5e94db]/20"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="blocked">Blocked</option>
        <option value="deleted">Deleted</option>
      </select>
    </div>
  );
};