import { Toggle } from "@/components/ui/toggle";

export default function Header() {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
        Drill baby drill
      </h1>
      <Toggle id="toggle-dark-mode">Dark Mode</Toggle>
    </div>
  );
}
