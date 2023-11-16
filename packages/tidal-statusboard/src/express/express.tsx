import React from "basicjsx"
import express from "express"
import http from "http"
import { TidalResponse } from "../types/tidal"
import style from "./styles.module.css"
import { updateInfo } from "../index"

let curInfo: TidalResponse = {} as TidalResponse
let curImage: string = ""

export let setInfo = (newInfo: TidalResponse) => {
    curInfo = newInfo
}

export let setImage = (newImage: string) => {
    curImage = newImage
}

export let startExpress = () => {
    const app = express()
    
    var resolve = async (req, res) => {
        await updateInfo()
        
        res.send("<!DOCTYPE html>" +
            (
                <html>
                    <head>
                        <style>
                            {style}
                        </style>
                    </head>
                    <body>
                        <div class="flexParent">
                            <div class="flexChild">
                                <img src={"data:image/png;base64," + curImage}></img>
                            </div>
                            <div class="flexChild">
                                <h1>{curInfo.title}</h1>
                                <h2>{curInfo.artist}</h2>
                            </div>
                        </div>
                    </body>
                </html>
            ).toString())
    }
    
    app.get('*', resolve)
    
    http.createServer(app)
    .listen(8080);
}