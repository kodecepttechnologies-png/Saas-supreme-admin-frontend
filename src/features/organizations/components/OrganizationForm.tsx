import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  isOrganizationFormValid,
  validateOrganizationForm,
} from "../schemas/organization.schema";

import type {
  Organization,
  OrganizationStatus,
  UpdateOrganizationRequest,
} from "../types/organization.types";

interface OrganizationFormProps {
  organization?: Organization;
  isSubmitting?: boolean;
  onSubmit: (values: UpdateOrganizationRequest) => void | Promise<void>;
  onCancel?: () => void;
}

interface OrganizationFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
  status: OrganizationStatus;
}

const defaultValues: OrganizationFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  logoUrl: "",
  status: "active",
};

export const OrganizationForm = ({
  organization,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: OrganizationFormProps) => {
  const [values, setValues] =
    useState<OrganizationFormValues>(defaultValues);

  const [errors, setErrors] = useState<
    ReturnType<typeof validateOrganizationForm>
  >({});

  useEffect(() => {
    if (!organization) {
      setValues(defaultValues);
      return;
    }

    setValues({
      name: organization.name,
      email: organization.email ?? "",
      phone: organization.phone ?? "",
      address: organization.address ?? "",
      logoUrl: organization.logoUrl ?? "",
      status: organization.status,
    });
  }, [organization]);

  const handleChange = (
    field: keyof OrganizationFormValues,
    value: string,
  ) => {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const payload: UpdateOrganizationRequest = {
      name: values.name.trim(),
      email: values.email.trim() || null,
      phone: values.phone.trim() || null,
      address: values.address.trim() || null,
      logoUrl: values.logoUrl.trim() || null,
      status: values.status,
    };

    const validationErrors =
      validateOrganizationForm(payload);

    setErrors(validationErrors);

    if (!isOrganizationFormValid(payload)) {
      return;
    }

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Organization Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="organization-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Organization Name
          </label>

          <input
            id="organization-name"
            type="text"
            value={values.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            disabled={isSubmitting}
            placeholder="Enter organization name"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.name
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="organization-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="organization-email"
            type="email"
            value={values.email}
            onChange={(event) =>
              handleChange("email", event.target.value)
            }
            disabled={isSubmitting}
            placeholder="contact@example.com"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="organization-phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            id="organization-phone"
            type="tel"
            value={values.phone}
            onChange={(event) =>
              handleChange("phone", event.target.value)
            }
            disabled={isSubmitting}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="organization-address"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <textarea
            id="organization-address"
            value={values.address}
            onChange={(event) =>
              handleChange("address", event.target.value)
            }
            disabled={isSubmitting}
            placeholder="Enter organization address"
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          {errors.address && (
            <p className="mt-1 text-xs text-red-600">
              {errors.address}
            </p>
          )}
        </div>

        {/* Logo URL */}
        <div>
          <label
            htmlFor="organization-logo"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Logo URL
          </label>

          <input
            id="organization-logo"
            type="url"
            value={values.logoUrl}
            onChange={(event) =>
              handleChange("logoUrl", event.target.value)
            }
            disabled={isSubmitting}
            placeholder="https://example.com/logo.png"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
              errors.logoUrl
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />

          {errors.logoUrl && (
            <p className="mt-1 text-xs text-red-600">
              {errors.logoUrl}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="organization-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="organization-status"
            value={values.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value as OrganizationStatus,
              )
            }
            disabled={isSubmitting}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="deleted">Deleted</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-xs text-red-600">
              {errors.status}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
            boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
          }}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};