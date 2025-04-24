
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function TestMenu() {
  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="font-semibold bg-transparent data-[state=open]:bg-paycard-navy-600 data-[state=open]:text-paycard-salmon">
          Test Menu
        </MenubarTrigger>
        <MenubarContent className="bg-paycard-navy min-w-[180px]">
          <MenubarItem className="text-gray-300 focus:bg-paycard-navy-600 focus:text-paycard-salmon">
            Link Cards
          </MenubarItem>
          <MenubarItem className="text-gray-300 focus:bg-paycard-navy-600 focus:text-paycard-salmon">
            Allocate Cards
          </MenubarItem>
          <MenubarItem className="text-gray-300 focus:bg-paycard-navy-600 focus:text-paycard-salmon">
            Load Funds
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
