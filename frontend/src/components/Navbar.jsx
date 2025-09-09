import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { fetchLogout } from "../apis/authentication";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ name, surname }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      const jwt = Cookies.get("jwt");
      console.log("jwt:" + jwt);
      const [logoutResponse, error] = await fetchLogout(jwt);
      if (error) {
        alert(error);
        return;
      } else {
        console.log(logoutResponse);

        // window.location.href = "/login";
        const cookieValue = Cookies.get("jwt");
        console.log("jwt cookie:" + cookieValue);
        Cookies.remove("jwt");
        navigate("/login");
      }
    }
  };

  // const Navbar = ({ name, surname }) => {
  const navigation = [
    { name: "Dashboard", href: "/", current: true, onClick: null },
    { name: "Login", href: "/login", current: false, onClick: null },
    { name: "Register", href: "/register", current: false, onClick: null },
    { name: "Logout", href: "#", current: false, onClick: handleLogout },
  ];

  return (
    <div className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="flex">
        <div className="hidden sm:ml-6 sm:block justify-between">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              onClick={item.onClick ? item.onClick : null}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* Profile dropdown */}

        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
              >
                Your profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
              >
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
              >
                Sign out
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
