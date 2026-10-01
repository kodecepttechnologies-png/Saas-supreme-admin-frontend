// ─── Raw backend shape from GET /notifications ───────────────────────────────
// Fields are optional/flexible to tolerate different API versions gracefully.

export interface BackendNotification {
  /** Primary key — some backends use `id`, others `_id` */
  id?: string;
  _id?: string;

  title?: string;

  /** Body text — backend may call this `message` or `description` */
  message?: string;
  description?: string;

  /** Category hint used to pick an icon (e.g. "organization", "system") */
  type?: string;

  /** Read flag — backend may use `isRead` or `read` */
  isRead?: boolean;
  read?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// ─── Envelope ─────────────────────────────────────────────────────────────────
// The backend may return a flat array or a paginated object.

export interface NotificationsResponse {
  success: boolean;
  message?: string;
  data:
    | BackendNotification[]
    | {
        notifications: BackendNotification[];
        [key: string]: unknown;
      };
}
