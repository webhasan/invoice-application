import { FC, useContext, ReactNode } from "react";
import { AuthContext } from "../../store/auth-context";
import { useRouter } from "next/router";

type propsType = {
	children: ReactNode;
};

const Unprotected: FC<propsType> = ({ children }) => {
   const { status } = useContext(AuthContext);
   const router = useRouter();

	if (status === "loading") {
		return null;
	}

	if (status === "authenticated") {
		router.replace("/");
		return null;
	}

	return <>{children}</>;
};

export default Unprotected;
