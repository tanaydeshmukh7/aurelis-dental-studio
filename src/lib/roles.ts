export type StaffRole =
  | "SUPER_ADMIN"
  | "CLINIC_ADMIN"
  | "DENTIST"
  | "RECEPTIONIST"
  | "ACCOUNTANT"
  | "CONTENT_EDITOR";

export interface SessionPayload {
  userId: string;
  email: string;
  fullName: string;
  role: StaffRole;
  avatar?: string | null;
}

export const SESSION_COOKIE_NAME = "aurelis_admin_session";

// Permissions mapping by role
export const ROLE_PERMISSIONS: Record<StaffRole, {
  canAccessAppointments: boolean;
  canManageAppointments: boolean;
  canAccessPatients: boolean;
  canAccessClinicalNotes: boolean;
  canEditClinicalNotes: boolean;
  canAccessTreatments: boolean;
  canManageTreatments: boolean;
  canAccessStaff: boolean;
  canManageStaff: boolean;
  canAccessSchedule: boolean;
  canAccessBilling: boolean;
  canManageBilling: boolean;
  canAccessExpenses: boolean;
  canAccessInventory: boolean;
  canManageInventory: boolean;
  canAccessCMS: boolean;
  canManageCMS: boolean;
  canAccessLeads: boolean;
  canAccessReports: boolean;
  canAccessSettings: boolean;
  canAccessAuditLogs: boolean;
}> = {
  SUPER_ADMIN: {
    canAccessAppointments: true,
    canManageAppointments: true,
    canAccessPatients: true,
    canAccessClinicalNotes: true,
    canEditClinicalNotes: true,
    canAccessTreatments: true,
    canManageTreatments: true,
    canAccessStaff: true,
    canManageStaff: true,
    canAccessSchedule: true,
    canAccessBilling: true,
    canManageBilling: true,
    canAccessExpenses: true,
    canAccessInventory: true,
    canManageInventory: true,
    canAccessCMS: true,
    canManageCMS: true,
    canAccessLeads: true,
    canAccessReports: true,
    canAccessSettings: true,
    canAccessAuditLogs: true,
  },
  CLINIC_ADMIN: {
    canAccessAppointments: true,
    canManageAppointments: true,
    canAccessPatients: true,
    canAccessClinicalNotes: false, // Protected clinical data
    canEditClinicalNotes: false,
    canAccessTreatments: true,
    canManageTreatments: true,
    canAccessStaff: true,
    canManageStaff: true,
    canAccessSchedule: true,
    canAccessBilling: true,
    canManageBilling: true,
    canAccessExpenses: true,
    canAccessInventory: true,
    canManageInventory: true,
    canAccessCMS: true,
    canManageCMS: true,
    canAccessLeads: true,
    canAccessReports: true,
    canAccessSettings: false,
    canAccessAuditLogs: true,
  },
  DENTIST: {
    canAccessAppointments: true,
    canManageAppointments: true,
    canAccessPatients: true,
    canAccessClinicalNotes: true,
    canEditClinicalNotes: true,
    canAccessTreatments: true,
    canManageTreatments: false,
    canAccessStaff: false,
    canManageStaff: false,
    canAccessSchedule: true,
    canAccessBilling: false,
    canManageBilling: false,
    canAccessExpenses: false,
    canAccessInventory: true,
    canManageInventory: false,
    canAccessCMS: false,
    canManageCMS: false,
    canAccessLeads: false,
    canAccessReports: false,
    canAccessSettings: false,
    canAccessAuditLogs: false,
  },
  RECEPTIONIST: {
    canAccessAppointments: true,
    canManageAppointments: true,
    canAccessPatients: true,
    canAccessClinicalNotes: false, // Receptionists cannot view clinical notes
    canEditClinicalNotes: false,
    canAccessTreatments: true,
    canManageTreatments: false,
    canAccessStaff: false,
    canManageStaff: false,
    canAccessSchedule: true,
    canAccessBilling: true,
    canManageBilling: true,
    canAccessExpenses: false,
    canAccessInventory: true,
    canManageInventory: false,
    canAccessCMS: false,
    canManageCMS: false,
    canAccessLeads: true,
    canAccessReports: false,
    canAccessSettings: false,
    canAccessAuditLogs: false,
  },
  ACCOUNTANT: {
    canAccessAppointments: false,
    canManageAppointments: false,
    canAccessPatients: false,
    canAccessClinicalNotes: false,
    canEditClinicalNotes: false,
    canAccessTreatments: false,
    canManageTreatments: false,
    canAccessStaff: false,
    canManageStaff: false,
    canAccessSchedule: false,
    canAccessBilling: true,
    canManageBilling: true,
    canAccessExpenses: true,
    canAccessInventory: true,
    canManageInventory: false,
    canAccessCMS: false,
    canManageCMS: false,
    canAccessLeads: false,
    canAccessReports: true,
    canAccessSettings: false,
    canAccessAuditLogs: false,
  },
  CONTENT_EDITOR: {
    canAccessAppointments: false,
    canManageAppointments: false,
    canAccessPatients: false,
    canAccessClinicalNotes: false,
    canEditClinicalNotes: false,
    canAccessTreatments: true,
    canManageTreatments: true,
    canAccessStaff: false,
    canManageStaff: false,
    canAccessSchedule: false,
    canAccessBilling: false,
    canManageBilling: false,
    canAccessExpenses: false,
    canAccessInventory: false,
    canManageInventory: false,
    canAccessCMS: true,
    canManageCMS: true,
    canAccessLeads: false,
    canAccessReports: false,
    canAccessSettings: false,
    canAccessAuditLogs: false,
  },
};
