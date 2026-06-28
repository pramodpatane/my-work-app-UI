export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  expanded?: boolean;
  children?: MenuItem[];
  roles?: string[];
}