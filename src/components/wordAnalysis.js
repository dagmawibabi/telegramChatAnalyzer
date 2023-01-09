/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

export const WordAnalysis = (props) => {
    const [resultLimit, setSliderValue] = useState(50);
    const [results, setResults] = useState(props.wordCountSortedObject);
    const [searchTerm, setSearchTerm] = useState(" ");

    let wordCount = props.wordCount;
    // let results = props.wordCountSortedObject;

    

    function searchWord(e) {
        // setSearchTerm(document.getElementById("searchField").value);
        setSearchTerm(e.target.value);

        // console.log(e.target.value + " : " + document.getElementById("searchField").value);
        if (searchTerm.trim().length === 0 || searchTerm === "" || searchTerm === " ") {
            adjustLimit();
            // console.log("here");
        } else {
            let wordResult = {};
            for(let eachMatch of Object.keys(props.wordCount)){
                if (eachMatch.toString().startsWith(searchTerm)){
                    wordResult[eachMatch] = wordCount[eachMatch];
                }
            }
            setResults(wordResult);
        }        
    }

    function adjustLimit() {
        let wordCountSorted = Object.keys(wordCount).sort(
            (a,b) => {
                return wordCount[b] - wordCount[a] // Sort Descending
            }
        );

        setResults({});

        // results = {};
        let workingResults = {};
        for (let i = 0; i < resultLimit; i++) {
            workingResults[wordCountSorted[i]] = props.wordCount[wordCountSorted[i]];
        }
        setResults(workingResults);
    }
    
    useEffect(() => {
        adjustLimit();
    }, []);

    useEffect(() => {
        adjustLimit();
    }, [resultLimit])
    

    return (
        <div>
            <div className="text-white mt-24 pb-2">
                <span className="font-bold text-3xl">
                    Word Analysis
                </span>
            </div>
            <div className="justify-center mx-auto overflow-x-auto w-2/3 text-center bg-zinc-800 rounded-2xl px-8 py-2 mt-5 text-white">
                <div className="block justify-center text-center align-middle my-auto m-2 rounded-lg px-5 py-5">
                    <input id="searchField" type="text" placeholder="Search Word" className="px-5 py-3 w-96 mb-7 rounded-lg outline-none  bg-zinc-700" onChange={(e) => {searchWord(e)}}/>
                    {/* <div className="btn btn-primary px-14 text-lg mb-7" onClick={searchWord}>
                        <span> Search  </span>
                    </div> */}
                    <div className={searchTerm.toString().trim().length === 0 ? "flex justify-between my-auto" : "hidden"}>
                        <span> {resultLimit} </span>
                        <input type="range" min="0" max={Object.keys(wordCount).length} value={resultLimit} className="range range-xs mx-4" onChange={(e)=>{setSliderValue(e.target.value)}}/>
                        <span> {Object.keys(wordCount).length} </span>
                    </div>
                </div>
                <div className="flex justify-center w-full mx-auto my-2 mb-6">
                    <table className="table-normal mx-auto h-fit w-full bg-zinc-700 rounded-2xl">
                        <thead className="bg-teal-500 text-black font-bold text-xl">
                            <tr className="font-bold text-xl">
                                <th> </th>
                                <th> Words </th>
                                <th className="text-right"> Frequency </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(results).map((value, index) => {
                                    return (
                                        <tr className="hover:bg-zinc-300 hover:text-black bg-zinc-900 hover:font-bold ">
                                            <td> {index + 1} </td>
                                            <td> {value} </td>
                                            <td className="text-right"> {results[value]} </td>
                                        </tr>)
                                })
                            }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}