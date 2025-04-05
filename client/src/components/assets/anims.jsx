import React from "react";
import { motion } from "framer-motion";

export function StartingAnim() {
    return (
        <div className="anim-container loadingAnim-container">
            <div className="anim-elements">
                <motion.div
                    className="ball blue"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "circInOut" }}
                />
                <motion.div
                    className="ball red"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "circInOut" }}
                />
            </div>
            <style>{`
          .loadingAnim-container {
              width: 90px;
              height: 90px;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .loadingAnim-container .anim-elements {
            position: relative;
            justify-content: center;
            width: 0px;
            height: 0px;
          }
          .loadingAnim-container .ball {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 100%;
          }
          .loadingAnim-container .blue {
            background-color: #3366ff;
            bottom: 20px;
            right: 20px;
            transform-origin: 30px 30px;
          }
          .loadingAnim-container .red {
            background-color: #ff3366;
            top: 20px;
            left: 20px;
            transform-origin: -10px -10px;
          }
        `}</style>
        </div>
    );
};


export function LoadingAnim() {
    return (
        <div className="anim-container loadingAnim-container">
            <div className="anim-elements">
                <motion.div
                    className="ball blue"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "circInOut" }}
                />
                <motion.div
                    className="ball red"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "circInOut" }}
                />
            </div>
            <style>{`
                @keyframes appearAnim {
                    0% { display: none; }
                    90% { display: none; }
                    100% { display: flex; }
                }
        
                .loadingAnim-container {
                    width: 0px;
                    height: 0px;
                    align-items: center;
                    justify-content: center;
                    animation: appearAnim 1s ease-in-out;
                }
                .loadingAnim-container .anim-elements {
                    position: relative;
                    justify-content: center;
                    width: 0px;
                    height: 0px;
                }
                .loadingAnim-container .ball {
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    border-radius: 100%;
                }
                .loadingAnim-container .blue {
                    background-color: #3366ff;
                    bottom: 20px;
                    right: 20px;
                    transform-origin: 30px 30px;
                }
                .loadingAnim-container .red {
                    background-color: #ff3366;
                    top: 20px;
                    left: 20px;
                    transform-origin: -10px -10px;
                }
      `}</style>
        </div>
    );
}; export default LoadingAnim

export function MiniLoadingAnim() {
    return (
        <div className="anim-container loadingAnim-container">
            <div className="anim-elements">
                <motion.div
                    className="ball blue"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "circInOut" }}
                />
                <motion.div
                    className="ball red"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "circInOut" }}
                />
            </div>
            <style>{`
                @keyframes appearAnim {
                    0% { display: none; }
                    90% { display: none; }
                    100% { display: flex; }
                }
                    
                .loadingAnim-container {
                    width: 0px;
                    height: 0px;
                    align-items: center;
                    justify-content: center;
                    animation: appearAnim 1s ease-in-out;
                }

                .loadingAnim-container .anim-elements {
                    position: relative;
                    justify-content: center;
                    width: 0px;
                    height: 0px;
                }
                .loadingAnim-container .ball {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                }
                .loadingAnim-container .blue {
                    background-color: #3366ff;
                    bottom: 5px;
                    right: 5px;
                    transform-origin: 12px 12px;
                }
                .loadingAnim-container .red {
                    background-color: #ff3366;
                    top: 5px;
                    left: 5px;
                    transform-origin: -2px -2px;
                }
      `}</style>
        </div>
    );
};