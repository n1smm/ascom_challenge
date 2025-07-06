function Header() {
	return (
		<div className="realtive w-full">
		<div className="fixed top-0 left-0 w-full h-22 z-20 bg-gradient-to-l from-[#4b4b4b] to-white" ></div>
		<div className="fixed top-0 left-0 w-full h-20 z-50 flex items-center bg-white">
			<img 
				src="/ascomLogo.png" 
				alt="ascom logo"
				className="h-[80%] ml-2"/>
		

		</div>
		</div>
	)
}

export default Header;
