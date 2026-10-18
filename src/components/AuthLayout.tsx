import { useState, useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../store/store";

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

export default function Protected({
  children,
  authentication = true,
}: ProtectedProps) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 0);

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div role="status" aria-live="polite" className="p-8 text-center">
      Loading...
    </div>
  ) : (
    <>{children}</>
  );
}
