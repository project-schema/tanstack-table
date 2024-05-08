import { ReactNode } from 'react';

export default function Header({ children }: { children: ReactNode }) {
	return <h1 className="mt-3 mb-2">{children}</h1>;
}
