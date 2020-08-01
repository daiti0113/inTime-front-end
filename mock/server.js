/* eslint-disable no-undef */
const jsonServer = require("json-server")
const bodyParser = require("body-parser")
const server = jsonServer.create()
const router = jsonServer.router(__dirname + "/db.json")
const middlewares = jsonServer.defaults()
const port = 3000

// Middleware(前処理)
server.use(bodyParser.json())
server.use(middlewares)
server.use((req, res, next) => {
    // テスト用のモックなので、HTTPメソッドは全てGETに変えて、正常終了したようにレスポンスを返す。
    if (req.method !== "GET") {
        req.url = `${req.url}_${req.method.toLowerCase()}` // urlの末尾にHTTPメソッドを付加
        req.method = "GET" // GETに偽装
    }
    req.url = req.url.replace(/\./g, "")
    console.log(req.url, req.body)
    next()
})

// Routes
server.use(jsonServer.rewriter({
    "/api/*": "/$1",
    "/posts\\?id=:id": "/posts/:id"
}))
server.use(router)

// 後処理
router.render = function (req, res) {
    // db.jsonの返却値に"type":"string"がある場合、"data"の内容を文字列として返却する
    if (res.locals.data.type && res.locals.data.type === "string") {
        res.send(res.locals.data.name)
    } else {
        res.send(res.locals.data)
    }
}

// モックサーバ起動
server.listen(port, () => {
    console.log(`JSON Server is running in localhost:${port}`)
})