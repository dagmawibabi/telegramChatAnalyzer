export const Header = () => {
    return (
        <div className="bg-black py-4 flex justify-between">
            <div className="flex space-between ml-5">
                <img className="w-9 h-9 mx-1 bg-white hover:bg-zinc-400 rounded-full p-1" alt="socials" src={require("../assets/dashboard.png")} />
                <span className="text-white text-2xl font-bold ml-2"> Chat Analyzer </span>
            </div>
            <div className="flex justify-evenly  rounded-lg px-2 py-1 mr-5">
                <a href="https://dagmawibabi.com">
                    <img className="w-10 h-10 mx-1 bg-zinc-600 hover:bg-zinc-300 rounded-full p-1" alt="socials" src={require("../assets/world-wide-web.png")} />
                </a>
                <a href="https://github.com/dagmawibabi">
                    <img className="w-10 h-10 mx-2 bg-zinc-600 hover:bg-zinc-300 rounded-full p-1" alt="socials" src={require("../assets/github.png")} />
                </a>
                <a href="https://t.me/dagmawi_babi">
                <img className="w-10 h-10 mx-2 bg-zinc-600 hover:bg-zinc-300 rounded-full p-1" alt="socials" src={require("../assets/telegram.png")} />
                </a>
            </div>
        </div>
    )
}