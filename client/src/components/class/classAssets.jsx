import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KatexRenderer from '../global/katexRenderer';

export function ClassText({ text }) {
    return (
        <div className="panelContainer rowMargin paragraph">
            <p>{text}</p>
        </div>
    );
}

export function ClassVideo({ url }) {
    return (
        <div className="flexCenter rowMargin videoContainer">
            <video autoPlay loop muted>
                <source src={url} type="video/mp4" />
            </video>
        </div>
    );
}

export function ClassImage({ url }) {
    return (
        <div className=" rowMargin videoContainer">
            <img className="imageClass" src={url} />
        </div>
    );
}

export function SideContent({ left, right, leftContent, rightContent }) {
    return (
        <div className="rowMargin contentFlexBox">
            {left == "image" && (
                <img className="flexCenter imageClass" src={leftContent} />
            )}
            {left == "video" && (
                <div className="flexCenter videoContainer">
                    <video autoPlay loop muted>
                        <source src={leftContent} type="video/mp4" />
                    </video>
                </div>
            )}
            {left == "text" && (
                <div className="panelContainer paragraph">
                    <p>{leftContent}</p>
                </div>
            )}

            {right == "image" && (
                <img className="flexCenter imageClass" src={rightContent} />
            )}
            {right == "video" && (
                <div className="flexCenter videoContainer">
                    <video autoPlay loop muted>
                        <source src={rightContent} type="video/mp4" />
                    </video>
                </div>
            )}
            {right == "text" && (
                <div className="panelContainer paragraph">
                    <p>{rightContent}</p>
                </div>
            )}
        </div>
    );
}
