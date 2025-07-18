const Loader = ({ size }: { size?: string }) => {
  return (
    <>
      <span
        className={`loading loading-dots loading-${size ? size : "md"}`}
      ></span>
    </>
  );
};

export default Loader;
