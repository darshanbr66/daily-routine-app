function Toolbar({
  left,
  right,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        bg-white
        p-4
        shadow-sm
        lg:flex-row
        lg:items-center
        lg:justify-between
        ${className}
      `}
    >
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {left}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        {right}
      </div>
    </div>
  );
}

export default Toolbar;