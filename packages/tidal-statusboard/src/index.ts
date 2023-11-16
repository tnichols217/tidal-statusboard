import http from "http"
import {setInfo, setImage, startExpress} from "./express/express"

const HOST = "http://localhost:47836"

let getStatus = (host, endpoint): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.get(host + endpoint, (res) => {
            let data: any[] = []
        
            res.on("data", (chunk) => {
                data.push(chunk)
            })
        
            res.on("end", () => {
                resolve(Buffer.concat(data))
            })

            res.on("error", (err) => {
                reject(err)
            })
        })
    })
}

export let updateInfo = (): Promise<void[]> => {
    let a = [
        getStatus(HOST, "/current").then(a => setInfo(JSON.parse(a.toString()))).catch(console.error),
        getStatus(HOST, "/image").then(a => setImage(a.toString("base64"))).catch(console.error)
    ]
    return Promise.all(a)
}

startExpress()
