import { Loader2 } from "lucide-react";
import React from "react";

const AuthPageLoader = () => {
	return (
		<div className="rounded-md shadow-md bg-card/40 overflow-hidden my-8 mx-auto flex flex-col items-center justify-center gap-2 p-8">
      <Loader2 className="animate-spin" />
			<div className="text-foreground flex items-center gap-2">
				Redirecting to your destination...
			</div>
		</div>
	);
};

export default AuthPageLoader;
