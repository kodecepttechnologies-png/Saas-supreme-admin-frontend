import type { UpdateOrganizationRequest } from "../types/organization.types";

export interface OrganizationFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
  status?: string;
}

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const validateOrganizationForm = (
  values: UpdateOrganizationRequest,
): OrganizationFormErrors => {
  const errors: OrganizationFormErrors = {};

  if (values.name !== undefined) {
    const name = values.name.trim();

    if (!name) {
      errors.name = "Organization name is required.";
    } else if (name.length < 2) {
      errors.name = "Organization name must be at least 2 characters.";
    }
  }

  if (values.email !== undefined && values.email !== null) {
    const email = values.email.trim();

    if (email && !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (values.logoUrl !== undefined && values.logoUrl !== null) {
    const logoUrl = values.logoUrl.trim();

    if (logoUrl && !isValidUrl(logoUrl)) {
      errors.logoUrl = "Please enter a valid logo URL.";
    }
  }

  return errors;
};

export const isOrganizationFormValid = (
  values: UpdateOrganizationRequest,
): boolean => {
  return Object.keys(validateOrganizationForm(values)).length === 0;
};