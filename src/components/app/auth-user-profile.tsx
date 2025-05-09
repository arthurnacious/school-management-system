import { LogOut, MoveUpRight, Settings, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface Props {
  name: string;
  role: string;
  avatar?: string;
  subscription?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Settings",
    href: "/user/profile",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    label: "Terms & Policies",
    href: "/terms",
    icon: <FileText className="w-4 h-4" />,
  },
];

const AuthUserProfile: FC<Props> = ({ name, role, avatar }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-neutral-950">
        <div className="relative px-6 pt-5 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  width={42}
                  height={42}
                  className="rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full ring-4 ring-white dark:ring-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-ellipsis text-nowrap">
                {name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">{role}</p>
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2 
                                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                    rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center">
                  {item.value && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">
                      {item.value}
                    </span>
                  )}
                  {item.external && <MoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}

            <button
              type="button"
              className="w-full flex items-center justify-between p-2 
                                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                rounded-lg transition-colors duration-200"
              onClick={() => signOut()}
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthUserProfile;
