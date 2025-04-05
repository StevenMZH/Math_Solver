import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KatexRenderer from '../global/KatexRenderer';

export function ClassText({ text }) {
    return (
        <div className="panelContainer segment-margin text-focus textAsset">
            <p>{text}</p>
        </div>
    );
}

export function ClassVideo({ url }) {
    return (
        <div className="flexCenter segment-margin videoAsset">
            <video autoPlay loop muted>
                <source src={url} type="video/mp4" />
            </video>
        </div>
    );
}

export function ClassImage({ url }) {
    return (
        <div className=" segment-margin imageAsset">
            <img src={url} alt="class image"/>
        </div>
    );
}

export function ClassCard({ multimedia_type, multimedia, text }) {
    return (
        <div className="segment-margin cardAsset">
            {multimedia_type == "image" && (
                <img className="flexCenter imageAsset" src={multimedia} alt="class image"/>
            )}
            {multimedia_type == "video" && (
                <div className="flexCenter videoAsset">
                    <video autoPlay loop muted>
                        <source src={multimedia} type="video/mp4" />
                    </video>
                </div>
            )}
            
            <div className="panelContainer text-focus textAsset">
                <p>{text}</p>
            </div>
        </div>
    );
}

export function ClassCard2({ multimedia_type, multimedia, text }) {
    return (
        <div className="segment-margin cardAsset reverseCard">
            {multimedia_type == "image" && (
                <img className="flexCenter imageAsset" src={multimedia} />
            )}
            {multimedia_type == "video" && (
                <div className="flexCenter videoAsset">
                    <video autoPlay loop muted>
                        <source src={multimedia} type="video/mp4" />
                    </video>
                </div>
            )}
            
            <div className="panelContainer text-focus textAsset">
                <p>{text}</p>
            </div>
        </div>
    );
}
