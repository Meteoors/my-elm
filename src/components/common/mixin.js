export const getImgPath = {
    methods:{
        getImgPath(path) {
            if(!path){
                return '//elm.cangdu.org/img/default.jpg'
            }
            let suffix;
            if(path.indexOf('jpeg') !== -1){
                suffix = '.jpeg';
            }else{
                suffix = '.png'
            }            
            let url = '/' + path.substr(0,1) + '/' + path.substr(1,2) + '/' + path.substr(3) + suffix;
            return 'https://fuss10.elemecdn.com' + url
        }
    }
}

// export const loadMore = {
//     directives: {
//         'load-more': {
//             bind: (el, loading) => {
//                 let windowHeight = window.screen.height;
                
//                 el.addEventListener('touchstart', )
//             }
//         }
//     }
// }