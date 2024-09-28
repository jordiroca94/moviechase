type Props = {
  className?: string;
  big?: boolean;
};

const Loader = ({ className, big }: Props) => {
  return (
    <div
      className={`${className} flex items-center justify-center text-current`}
    >
      <div className={`ctaLoader ${big && "big"}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
