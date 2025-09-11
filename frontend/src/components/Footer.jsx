const Footer = (properties) => {
  return (
    <div className="bg-blue-500">
      <div className="mt-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
        <h3 className="text-xl font-bold">
          Footer developed by {properties.name} {properties.surname}
        </h3>
      </div>
    </div>
  );
};

export default Footer;
