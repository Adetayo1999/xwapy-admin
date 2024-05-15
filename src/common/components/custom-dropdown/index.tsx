import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CustomDropDownProps {
  title: string;
  options: { title: string }[];
}

export const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  title,
}) => {
  return (
    <Menu>
      <MenuButton className="bg-[#F1F1F1] rounded-full px-5 py-2 text-xs font-semibold flex gap-x-1 items-center capitalize mb-2">
        <span className="text-[#000000]">{title}</span>
        <span>
          <MdKeyboardArrowDown className="text-2xl text-[#3E3E3E]" />
        </span>
      </MenuButton>
      <Transition
        enter="duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <MenuItems
          anchor="right start"
          className="origin-top transition bg-[#F1F1F1] min-w-[8rem] flex flex-col rounded-xl "
        >
          {options.map((item) => (
            <MenuItem key={item.title}>
              <button
                className="inline-block text-left py-3 px-6 text-xs text-[#000000] font-medium
               hover:bg-opacity-45 transition duration-300 
              "
              >
                {item.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};
