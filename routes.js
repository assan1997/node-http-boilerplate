const controller = require('./controller')
const home = {
    url:'/home/home2/home',
    view : 'home',
    data :{ greet :controller.homeController()}
}

const about = {
    url:'/about:id',
    view : 'about',
    data :{greet :'hello aimé et aubin'}
}


module.exports = [
    home ,about
]