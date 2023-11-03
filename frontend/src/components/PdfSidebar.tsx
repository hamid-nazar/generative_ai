
import { Menu } from "lucide-react";
import { Button } from "./ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import  Sidebar  from "./Sidebar";

export default function MobileSidebar () {

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}