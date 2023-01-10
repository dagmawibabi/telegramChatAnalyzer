import { useState } from "react";
import { Results } from "./results";
import { WordAnalysis } from "./wordAnalysis";
   
// Vars
let person1;
let person2;
let dataJSON;
let messages; 
let totalMessages; 

let fromPerson1 = 0;
let fromPerson2 = 0;

let phoneCallsCount = 0;

let missedPhoneCallsCount = 0;
let missedCallsPerson1 = 0;
let missedCallsPerson2 = 0;

let disconnectPhoneCallsCount = 0;
let disconnectCallsPerson1 = 0;
let disconnectCallsPerson2 = 0;

let hangupPhoneCallsCount = 0;
let hangupCallsPerson1 = 0;
let hangupCallsPerson2 = 0;

let busyPhoneCallsCount = 0;
let busyCallsPerson1 = 0;
let busyCallsPerson2 = 0;

let pinMessages = 0;
let pinMessagesPerson1 = 0;
let pinMessagesPerson2 = 0;

let themeEdits = 0;
let themeEditsPerson1 = 0;
let themeEditsPerson2 = 0;

let wordCount = {};    
let wordCountSortedObject = {
    "words": 123
};
let content;
let textAnalysis = {
    // "totalMessages": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
    // "phoneCalls": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
    // "busyCalls": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
    // "missedCalls": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
    // "hangupCalls": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
    // "disconnectCalls": {
    //     person1: 100,
    //     person2: 200,
    //     total: 300,
    // },
};

export const InputFile = () => {
    // Reset Var
    function resetVars() {
        setDataLoaded(false);
        // Vars
        person1 = null;
        person2 = null;
        dataJSON = null;
        messages = null; 
        totalMessages = null; 

        fromPerson1 = 0;
        fromPerson2 = 0;

        phoneCallsCount = 0;

        missedPhoneCallsCount = 0;
        missedCallsPerson1 = 0;
        missedCallsPerson2 = 0;

        disconnectPhoneCallsCount = 0;
        disconnectCallsPerson1 = 0;
        disconnectCallsPerson2 = 0;

        hangupPhoneCallsCount = 0;
        hangupCallsPerson1 = 0;
        hangupCallsPerson2 = 0;

        busyPhoneCallsCount = 0;
        busyCallsPerson1 = 0;
        busyCallsPerson2 = 0;

        pinMessages = 0;
        pinMessagesPerson1 = 0;
        pinMessagesPerson2 = 0;

        themeEdits = 0;
        themeEditsPerson1 = 0;
        themeEditsPerson2 = 0;

        wordCount = {};    
        content = null;
    }
    
    // Get JSON File
    async function getFilePath(e)  {
        e.preventDefault();
        resetVars();
        let fileName = e.target.files.item(0)["name"];
        setFileName(fileName)
        let file = e.target.files.item(0);
        content = await readJSON(file);
    }

    // Get People
    function getPeople() {
        let peopleInChat = [];
        for(let eachMessage of messages) {
            if(eachMessage["type"] === "message") {
                if (peopleInChat.includes(eachMessage["from"]) === false) {
                    peopleInChat.push(eachMessage["from"]);
                }
            }
        }
        person1 = peopleInChat[0];
        person2 = peopleInChat[1];
        // person1 = document.getElementById("person1Name").value;
        // person2 = document.getElementById("person2Name").value;
    }

    // Start Analyzing
    function startAnalysis() {        
        dataJSON = JSON.parse(content);
        messages = dataJSON["messages"];
        totalMessages = dataJSON["messages"].length;

        getPeople();

        textAnalyze();

        setDataLoaded(true);
    }

    // Read JSON File
    async function readJSON(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    }

    // Text Analyze
    function textAnalyze() {
        for(let eachMessage of messages){
            if (eachMessage["type"] !== "service") {
                // Word Count
                let text = eachMessage["text"].toString().toLowerCase();
                let wordArray = text.split(" ");
                for (let eachWord of wordArray) {
                    if(wordCount[eachWord] !== null && wordCount[eachWord] !== undefined && isNaN(wordCount[eachWord]) !== true) {
                        wordCount[eachWord]++;
                    } else {
                        wordCount[eachWord] = 1;
                    }
                }
                // Message Count
                if (eachMessage["from"] === person1) {
                    fromPerson1++;
                } else if (eachMessage["from"] === person2) {
                    fromPerson2++;
                }
            } else {
                if (eachMessage["action"] === "phone_call") {
                    phoneCallsCount++
                    // Count all phone call types
                    if (eachMessage["discard_reason"] === "busy") {
                        busyPhoneCallsCount++;
                        if (eachMessage["actor"] === person1) {
                            busyCallsPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            busyCallsPerson2++;
                        }
                    } else if (eachMessage["discard_reason"] === "missed") {
                        missedPhoneCallsCount++;
                        if (eachMessage["actor"] === person1) {
                            missedCallsPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            missedCallsPerson2++;
                        }
                    } else if (eachMessage["discard_reason"] === "hangup") {
                        hangupPhoneCallsCount++;
                        if (eachMessage["actor"] === person1) {
                            hangupCallsPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            hangupCallsPerson2++;
                        }
                    } else if (eachMessage["discard_reason"] === "disconnect") {
                        disconnectPhoneCallsCount++;
                        if (eachMessage["actor"] === person1) {
                            disconnectCallsPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            disconnectCallsPerson2++;
                        }
                    }
                } else {
                    // Other Actions
                    if (eachMessage["action"] === "pin_message") {
                        pinMessages++;
                        if (eachMessage["actor"] === person1) {
                            pinMessagesPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            pinMessagesPerson2++;
                        }
                    } else if (eachMessage["action"] === "edit_chat_theme") {
                        themeEdits++;
                        if (eachMessage["actor"] === person1) {
                            themeEditsPerson1++;
                        } else if (eachMessage["actor"] === person2) {
                            themeEditsPerson2++;
                        }
                    }
                }
            }
        }; 

        // Summary
        let totalCallsPerson1 = busyCallsPerson1 + missedCallsPerson1 + hangupCallsPerson1 + disconnectCallsPerson1;
        let totalCallsPerson2 = busyCallsPerson2 + missedCallsPerson2 + hangupCallsPerson2 + disconnectCallsPerson2;

        textAnalysis = {
            "totalMessages": {
                person1: fromPerson1,
                person2: fromPerson2,
                total: totalMessages,
            },
            "phoneCalls": {
                person1: totalCallsPerson1,
                person2: totalCallsPerson2,
                total: phoneCallsCount,
            },
            "busyCalls": {
                person1: busyCallsPerson1,
                person2: busyCallsPerson2,
                total: busyPhoneCallsCount,
            },
            "missedCalls": {
                person1: missedCallsPerson1,
                person2: missedCallsPerson2,
                total: missedPhoneCallsCount,
            },
            "hangupCalls": {
                person1: hangupCallsPerson1,
                person2: hangupCallsPerson2,
                total: hangupPhoneCallsCount,
            },
            "disconnectCalls": {
                person1: disconnectCallsPerson1,
                person2: disconnectCallsPerson2,
                total: disconnectPhoneCallsCount,
            },
            "pinMessages": {
                person1: pinMessagesPerson1,
                person2: pinMessagesPerson2,
                total: pinMessages,
            },
            "themeEdits": {
                person1: themeEditsPerson1,
                person2: themeEditsPerson2,
                total: themeEdits,
            },
        }


    }

    const [fileName, setFileName] = useState(" ");   
    const [dataLoaded, setDataLoaded] = useState(false);   
     

    return (
        <div className= {dataLoaded === false ? "flex justify-center h-screen bg-zinc-900 " : "flex justify-center h-fit bg-zinc-900 "}>
            <div className="text-center py-10 px-56 text-black w-screen">
                <div className="text-white text-lg mb-10 ">
                    <span className="block text-3xl mb-3 font-bold"> What is this? </span>
                    <span className="text-slate-300"> This tool helps you see statistical insights to your telegram private chats. </span>
                    <br />
                    <span className="text-slate-300"> It will analyze and show you the number of texts from both people, most used words, different types of calls and much more. </span>
                </div>
                <div className="text-white text-lg mb-10">
                    <span className="block text-3xl mb-3 font-bold"> How to use? </span>
                    <span className="text-slate-300"> Export a telegram chat in JSON format and select the file and click "Analyze" below to analyze the data </span>
                </div>
                <div className="flex justify-center mb-4">
                    <div className="text-center bg-slate-200 w-fit px-10 py-5  rounded-xl">
                        <span className="text-2xl font-bold block mb-5"> Select Chat Export File </span>
                        {/* <input type="text" id="person1Name" placeholder="Person 1 Name" className="block my-2 px-3 py-1 rounded-lg w-72" />
                        <input type="text" id="person2Name" placeholder="Person 2 Name" className="block my-2 px-3 py-1 rounded-lg w-72" /> */}
                        <label htmlFor="fileInput" onChange={getFilePath} className="block mb-2 py-3 w-96 text-white font-bold text-lg bg-slate-800 hover:bg-slate-700 hover:text-green-400 rounded-2xl" >
                            {fileName !== " " ? fileName : "Select Chat Export File"}
                            <input id="fileInput" accept=".json" type="file" hidden></input>
                        </label>
                        <button className="block py-3 mb-4 w-96 text-white font-bold text-lg bg-zinc-900 hover:bg-zinc-800 hover:text-orange-500 rounded-2xl" type="button" onClick={startAnalysis}>  {fileName === " " ? "Waiting for export Data" : "Analyze"} </button>
                    </div>
                </div>
                {
                    dataLoaded === true ? 
                    (
                        <div>
                            <Results person1={person1} person2={person2} textAnalysis={textAnalysis} wordCountSortedObject={wordCountSortedObject}/>
                            <WordAnalysis wordCountSortedObject={wordCountSortedObject} wordCount={wordCount} />
                        </div>
                    ) : (
                        <div className="mt-32 text-zinc-500 rounded-lg px-10 py-5 bg-zinc-800 w-fit mx-auto font-bold">
                            <span> Result will be shown here... </span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}