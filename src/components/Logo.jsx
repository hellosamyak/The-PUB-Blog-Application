function Logo({ width = "100px" }) {
  return (
    <img
      src="/logo.png"
      alt="The PUB"
      style={{ width }}
      className="block h-auto object-contain"
    />
  );
}

export default Logo;
