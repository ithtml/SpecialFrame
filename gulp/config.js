var publicName = 'public';
var appName = 'app';
var src = 'src';
var dist = 'dist';

var srcPublic = src + '/' + publicName + '/';
var srcApp = src + '/' + appName + '/';
var distPublic = dist + '/' + publicName + '/';
var distApp = dist + '/' + appName + '/';

module.exports = {
    develop:true,
    /**
     * Sass resource
     */
    resSass: {
        public: {
            src: srcPublic + 'css/',
            dist: distPublic + 'css/'
        },
        app: {
            src: srcApp + 'css/',
            dist: distApp + 'css/'
        }
    },
    /**
     * Js resource
     */
    resJs:{
        public: {
            src: srcPublic + 'js/',
            dist: distPublic + 'js/'
        },
        app: {
            src: srcApp + 'js/',
            dist: distApp + 'js/'
        }
    },
    /**
     * Html resource
     */
    resHtml:{
        public:{
            src: srcPublic + '',
            dist: distPublic + ''
        },
        app:{
            src: srcApp + '',
            dist: distApp + ''
        }
    }

};