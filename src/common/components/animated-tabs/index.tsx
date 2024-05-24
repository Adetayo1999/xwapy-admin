import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface AnimatedTabsProps {
  tabs: { id: number; title: string; path: string }[];
}

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const location = useLocation();

  const fullUrl = `${location.pathname}${location.search}`;

  return (
    <div className="rounded-full bg-[#D9D9D9]  w-fit">
      <div className="flex space-x-1 justify-between md:justify-start ">
        {tabs.map((tab) => (
          <Link
            to={tab.path}
            key={tab.id}
            className={`relative rounded-full px-3 py-[0.65rem] text-sm font-semibold text-[#000000]  transition w-[9.5rem] flex justify-center`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {tab.path === fullUrl || (!location.search && tab.id === 1) ? (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-primary "
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            ) : null}
            <span className="z-10 relative text-center">{tab.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
