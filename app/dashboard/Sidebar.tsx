import { Calendar, House } from "@phosphor-icons/react/dist/ssr";

import SidebarItem from "./SidebarItem";

const LINKS = [
  {
    href: "/dashboard",
    icon: House,
    label: "Vaša vozila",
  },
  {
    href: "/dashboard/rentals",
    icon: Calendar,
    label: "Vaši najmovi",
  },
];

const Sidebar = () => {
  return (
    <aside className="h-fit hidden md:block md:w-1/3 lg:w-1/4 bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
      <ul className="w-full flex flex-col gap-4">
        {LINKS.map(({ icon: Icon, ...link }) => (
          <SidebarItem key={link.href} {...link}>
            <Icon weight="fill" size={20} />
          </SidebarItem>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
