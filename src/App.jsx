import React from "react";
import GridBackground from './GridBackground';
import FontList from './FontList.jsx'
import "./App.css";

const App = (props) => {
    return <div>
             <div className="header">
               <div className="item1"><div>Read more:</div><div> Github:</div>
               </div>
               <div className="item2">
                 <a href="https://vercel.com/blog/introducing-geist-pixel">
                   Introducing-geist-pixel </a>
                 <a href="https://github.com/vercel/geist-font/releases/tag/geist@1.7.0">geist-font</a>
               </div>
             </div>
             <GridBackground/>
             <FontList/>
           </div>
};

export default App;
