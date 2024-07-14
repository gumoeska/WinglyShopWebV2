const Logo = () => {
    return (
        <div draggable className="flex flex-row justify-center items-center cursor-grab">
            <img src="/src/assets/winglyShopLogoColor.png" className="size-16" />
            <h3 className="scroll-m-20 text-xl font-bold tracking-tight winglyColor">
                Wingly Shop
            </h3>
        </div>
    );
}

export default Logo;