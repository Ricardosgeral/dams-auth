interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-24 lg:text-32 font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-24 lg:text-32 font-sans font-semibold text-sky-500">
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p className="text-18 lg:text-22 font-normal text-gray-600">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
