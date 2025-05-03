import { useEffect, useState } from "react";

const ToggleModeTheme = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		const dark = savedTheme === "dark";
		setIsDark(dark);
		document
			.querySelector("html")
			.setAttribute("data-theme", dark ? "dark" : "light");
	}, []);

	const handleToggle = () => {
		const newTheme = isDark ? "light" : "dark";
		setIsDark(!isDark);
		document.querySelector("html").setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<label className="flex items-center gap-2 cursor-pointer">
			<span className={`text-xs ${isDark ? "bg-indigo-500 font-bold" : ""}`}>
				{isDark ? "Night" : "Day"}
			</span>
			<input
				type="checkbox"
				className="toggle border-fuchsia-100 bg-fuchsia-100 checked:border-indigo-700 checked:bg-indigo-700"
				checked={isDark}
				onChange={handleToggle}
			/>
		</label>
	);
};

export default ToggleModeTheme;
