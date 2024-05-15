interface SectionComponentProps {
  title: string;
  children: string | React.ReactNode;
}

export const SectionComponent: React.FC<SectionComponentProps> = ({
  children,
  title,
}) => {
  return (
    <div className="">
      <p className="text-sm text-[#B7B2B2] mb-1">{title}</p>
      <div className="">
        {typeof children === "string" ? (
          <h4 className="text-[#605F5F] font-semibold text-sm">{children}</h4>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
