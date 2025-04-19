import React, { useState, useEffect } from 'react';

// utils.js
export function parseText(input) {
    const lines = input.split("\n");
    return lines.map((line, index) => {
        // Lista con guion
        if (line.startsWith("- ")) {
            return <li key={index}>{applyFormatting(line.substring(2))}</li>;
        }
        // Línea vacía = salto de línea
        if (line.trim() === "") {
            return <br key={index} />;
        }
        return <p key={index}>{applyFormatting(line)}</p>;
    });
}

export function applyFormatting(text) {
    // Negrita: **texto**
    text = text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i}>{part.slice(2, -2)}</strong>; // Elimina los asteriscos de la negrita
        }
        return part;
    });

    // Cursiva: *texto*
    text = text.flatMap((part, i) =>
        typeof part === "string"
            ? part.split(/(\*[^*]+\*)/g).map((subpart, j) => {
                  if (subpart.startsWith("*") && subpart.endsWith("*")) {
                      return <em key={`${i}-${j}`}>{subpart.slice(1, -1)}</em>;
                  }
                  return subpart;
              })
            : [part]
    );

    return text;
}


export function ClassText({ text }) {
    return (
        <div className="panelContainer segment-margin text-focus textAsset">
            {parseText(text)}
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
