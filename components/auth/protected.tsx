import { FC, useContext, ReactNode } from "react";
import { AuthContext } from "../../store/auth-context";
import { useRouter } from "next/router";

type propsType = {
	children: ReactNode;
};

const Protected: FC<propsType> = ({ children }) => {
	const { status, user } = useContext(AuthContext);
	const router = useRouter();
	const noCompanyDetails =
		status === "authenticated" &&
		router.pathname !== "/company-details" &&
		!user?.companyDetails;

	if (status === "unauthenticated") {
		router.push(`/login`);
		return null;
	}

	if (noCompanyDetails) {
		router.push('/company-details');
		return null;
	}

	return <>{children}</>;
};

export default Protected;
