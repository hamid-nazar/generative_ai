
interface EmptyProps {
    label: string;
  }
  
  export default function Empty ({
    label
  }: EmptyProps){
    return (
      <div className="h-full p-20 flex flex-col items-center justify-center">
        <div className="relative h-72 w-72">
          <img src="/empty.png" className="h-full w-full object-cover" alt="Empty" />
        </div>
        <p className="text-muted-foreground text-sm text-center">
          {label}
        </p>
      </div>
    );
  }
