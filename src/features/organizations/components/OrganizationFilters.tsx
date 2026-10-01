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
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
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