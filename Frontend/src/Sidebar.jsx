import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";
import logo from "./assets/logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(
                "https://bchat-ai.onrender.com/api/thread",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const res = await response.json();
            setAllThreads(res);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(
                `https://bchat-ai.onrender.com/api/thread/${newThreadId}`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(
                `https://bchat-ai.onrender.com/api/thread/${threadId}`,
                {
                    method:"DELETE",

                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className={`sidebar ${sidebarOpen ? "open" : ""}`}>

            <div className="sidebarHeader">

                <button
                    className="closeSidebar"
                    onClick={() => setSidebarOpen(false)}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h3>BChat AI</h3>

            </div>

            <button onClick={createNewChat}>
                <img 
                    src={logo} 
                    className="gptlogo" 
                    alt="logo" 
                />    
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>


            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <p>By BhavanaVijay &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;