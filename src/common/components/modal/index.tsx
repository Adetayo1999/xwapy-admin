import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomButton from "../forms/button";
import appLogoDark from "@/assets/images/xwapy-logo-dark.png";

interface BaseModalProps {
  children: React.ReactNode;
  handleClose: () => void;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  handleClose,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen fixed top-0 left-0 z-20 overflow-hidden  w-full  bg-black bg-opacity-40"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-[25vh] bg-transparent" />
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          exit={{ y: "100%" }}
          className="h-[75vh]  md:overflow-hidden bg-white w-full flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="md:flex-[0.85] w-full md:w-fit overflow-y-auto flex-shrink-0 py-8 px-8 md:px-16">
            {children}
          </div>
          <div className="hidden md:block flex-[0.15] border-l border-[#E9E5E5] p-20 flex-shrink-0">
            <div className="mb-20 flex justify-center">
              <Link to="/">
                <img src={appLogoDark} alt="" className="w-24" />
              </Link>
            </div>
            <div className="flex flex-col items-center gap-y-8">
              <CustomButton className="flex items-center gap-x-3 text-sm !rounded-2xl w-fit">
                <span>Continue</span>
                <span>
                  <MdOutlineKeyboardArrowRight className="text-xl text-[#3E3E3E]" />
                </span>
              </CustomButton>
              <button
                className="text-[#000000] text-sm font-bold"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
