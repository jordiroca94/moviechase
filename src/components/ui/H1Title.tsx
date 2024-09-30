const H1Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={`text-5xl ${className && className}`}>{children}</h1>;
};
export default H1Title;
