const Heading = ({ text }: { text: string }) => {
    const letters = text.split("");
    return (
        <div className="text-center z-10 text-white"

        >
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className="text-4xl text-white font-Chakra_Petch md:text-3xl cursor-pointer duration-500 lg:text-5xl 2xl:text-6xl font-bold hover:scale-y-110 hover:text-pink-300"
                >
                    {letter}
                </span>
            ))}
        </div>
    );
};

export default Heading;