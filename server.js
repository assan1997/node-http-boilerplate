const http = require('http')
const querystring = require('querystring');
const url =require('url')

const fs = require('fs')

const ejs= require('ejs')

const routes = require('./routes')

const port = process.env.PORT || 3000

const server = http.createServer((req,res)=>{

    res.statusCode = 200;

    res.setHeader('Content-Type' ,'text/html')

    const pathname = req.url.split('/favicon.ico')[0].split('?')[0]

    let excludeLastSlash = pathname.split('')

    if(excludeLastSlash[excludeLastSlash.length-1] === '/') excludeLastSlash.splice(-1)


    console.log(excludeLastSlash.join(""))

    console.log(pathname)

    if(routes.find((route)=> route.url.includes(':'))){

        if(excludeLastSlash[excludeLastSlash.length-1] !== '/' && routes.find((route)=>  req.url.split('/').includes(route.url.split(':')[0]) )){
            console.log('ok is yet')
        }
    }

    const getRoute = routes.find((route)=> route.url === excludeLastSlash.join(""))

    if(getRoute){

      const htmlContent = `${fs.readFileSync(`./views/${getRoute?.view}.ejs`)}`
      const ejsRender = ejs.render(htmlContent , {filename: `${getRoute?.view}.ejs`, data: {...getRoute.data}})
      res.end(ejsRender)

    } 
    else res.end('Page not found')
    
    const parsed = url.parse(req.url);
    const query  = querystring.parse(parsed.query);
    
    console.log(query)

})


server.listen(port , (err)=>{
    if (err) throw err
    else console.log(`started at ${port}`)
})