interface LogoProps {
  width?: string;
}

function Logo({ width = "100px" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="The PUB"
      width={100}
      height={42}
      style={{ width }}
      className="block h-auto object-contain"
    />
  );
}

export default Logo;
