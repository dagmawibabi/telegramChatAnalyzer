import { StatCard } from "./statCard";

export const Results = (props) => {
    return (
        // 
        <div className="text-center bg-zinc-900 rounded-2xl w-full py-2 mt-14">
            <div className="text-white my-5 pb-3">
                <span className="font-bold text-3xl">
                    Activity Analysis
                </span>
            </div>
            <div className="flex justify-center bg-zinc-800 rounded-2xl p-0 my-3 w-11/12 mx-auto">
                <StatCard 
                    title = {"People In Chat"}
                    person1 = {"Person 1"}
                    person1Value = {props.person1}
                    person2 = {"Person 2"}
                    person2Value = {props.person2}
                />
                <StatCard 
                    title = {"Total Messages"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["totalMessages"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["totalMessages"]["person2"]}
                />
            </div>
            <div className="flex justify-center bg-zinc-800 rounded-2xl p-0 my-3 w-11/12 mx-auto">
                <StatCard 
                    title = {"Pinned Messages"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["pinMessages"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["pinMessages"]["person2"]}
                />
                <StatCard 
                    title = {"Theme Edits"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["themeEdits"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["themeEdits"]["person2"]}
                />
                <StatCard 
                    title = {"Phone Calls"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["phoneCalls"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["phoneCalls"]["person2"]}
                />
            </div>
            <div className="flex justify-center bg-zinc-800 rounded-2xl p-0 my-3 w-11/12 mx-auto">
                <StatCard 
                    title = {"Busy Calls"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["busyCalls"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["busyCalls"]["person2"]}
                />
                <StatCard 
                    title = {"Missed Calls"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["missedCalls"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["missedCalls"]["person2"]}
                />
                <StatCard 
                    title = {"Hangup Calls"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["hangupCalls"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["hangupCalls"]["person2"]}
                />
                <StatCard 
                    title = {"Disconnect Calls"}
                    person1 = {props.person1}
                    person1Value = {props.textAnalysis["disconnectCalls"]["person1"]}
                    person2 = {props.person2}
                    person2Value = {props.textAnalysis["disconnectCalls"]["person2"]}
                />
        </div>

    </div>
    )
}