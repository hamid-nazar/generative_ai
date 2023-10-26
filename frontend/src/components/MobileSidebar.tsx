import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "./ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import  Sidebar  from "./Sidebar";

export default function MobileSidebar () {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(function () {

    setIsMounted(true);

  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}