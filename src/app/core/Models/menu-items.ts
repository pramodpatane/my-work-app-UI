export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  type?: string;
  menuInfo?: string;
  expanded?: boolean;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canView?: boolean;
  children?: MenuItem[];
  roles?: string[];
}