export default function Footer() {
  const yearFormat = () => {
    const date: Date = new Date();
    const formattedDate: string = `${date.getFullYear().toString()}`;
    return formattedDate;
  };
  return (
    <footer className="flex flex-row justify-center items-center bottom-0">
      <div className="text-slate-300 p-4">
        <span className="font-semibold text-xs">
          COPYRIGHT ©{yearFormat()} SUMIPOL CORPORATION LIMITED
        </span>
      </div>
    </footer>
  );
}
