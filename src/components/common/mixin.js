export const getImgPath = {
    methods:{
        getImgPath(path) {
            if(!path){
                return '//elm.cangdu.org/img/default.jpg'
            }
            let url = '/' + path.substr(0,1) + '/' + path.substr(1,2) + '/' + path.substr(3) + '.png';
            return 'https://fuss10.elemecdn.com' + url
        }
    }
}