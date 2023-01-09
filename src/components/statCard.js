export const StatCard = (props) => {
    return (
        <div className="px-5 py-4 rounded-xl bg-zinc-900 text-white shadow-md  h-fit w-2/3 my-4 mx-4 hover:scale-100 hover:bg-zinc-300 hover:text-black hover:shadow-lg hover:shadow-zinc-700">
            <span className="block text-xl font-bold mb-4"> {props.title} </span> 
            <div className="flex justify-between"> 
                <span className="font-bold text-lg"> {props.person1}</span>
                <span className="font-bold text-lg"> {props.person1Value} </span>
            </div>
            <div className="flex justify-between"> 
                <span className="font-bold text-lg"> {props.person2}</span>
                <span className="font-bold text-lg"> {props.person2Value} </span>
           </div>
        </div>
    )
}