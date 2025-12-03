export const Section = ({ title, subtitle, children }) => {
  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between px-4">
        <div>
          <h1 className="text-xl text-white font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
};
