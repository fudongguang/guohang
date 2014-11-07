/**
 * Created by fudg on 14-10-17.
 */
var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization'),
    minifyCss = require('gulp-minify-css'),
    importCss = require('gulp-import-css'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    scp = require('gulp-scp2'),
    ssh = require('gulp-ssh'),
    zip = require('gulp-zip'),
    config = require('./build/config.js').config,
    del = require('del');

var dirOutput = 'build/output',//output目录
    dirExculde = '!{build,build/**,build.xml,**/*.sh,**/gulpfile.js}',//排除的文件及文件夹
    versionLogFile = 'build/versionLog.js';//被修改过的图片缓存文件


//时间戳
var getDateStr=function (addDayCount,formart) {
    formart = formart || 'yyyy-MM-dd';
    addDayCount = addDayCount || 0;

    var date = new Date();
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期
    var yyyy = date.getFullYear(),
        MM = date.getMonth() + 1,
        dd = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

    if(MM<10){
        MM = '0'+MM;
    }

    if(dd<10){
        dd='0'+dd;
    }

    if(hh<10){
        hh='0'+hh;
    }

    if(mm<10){
        mm='0'+mm;
    }

    if(ss<10){
        ss='0'+ss;
    }

    formart = formart.replace('yyyy',yyyy);
    formart = formart.replace('MM',MM);
    formart = formart.replace('dd',dd);
    formart = formart.replace('hh',hh);
    formart = formart.replace('mm',mm);
    formart = formart.replace('ss',ss);

    return formart;
};

var time = getDateStr(0,'MMddhhmmss');

//构建js
gulp.task('buildjs',function (cb) {
    del(dirOutput+'/gulpfile.js',function() {
    })

    rjs({
        baseUrl: dirOutput+'/js/',
        name: 'app',
        out: 'app.js'
    })
        .pipe(uglify())
        .pipe(gulp.dest(dirOutput+'/js'));

});

//压缩js
gulp.task('minifyJs',['copy'],function(){
    return gulp.src(['**/*.js'].concat(dirExculde))
        .pipe(uglify())
        .pipe(gulp.dest(dirOutput))
});

//构建css
gulp.task('buildcss',['minifyCss'],function () {
    return gulp.src('css/public/public.css')
        .pipe(importCss())
        .pipe(minifyCss())
        .pipe(gulp.dest(dirOutput+'/css/public'))
});

//压缩css
gulp.task('minifyCss',['copy'],function(){
    gulp.src(['**/*.css'].concat(dirExculde))
        .pipe(minifyCss())
        .pipe(gulp.dest(dirOutput))
});


//图片优化
gulp.task('images', function (cb) {
    gulp.src(['images/**/*'])
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('images')).on('end', cb).on('error', cb);
});

//复制项目到output
gulp.task('copy',['replace'],function(){
      return gulp.src(['**/*','!{output,output/**}','**/*.sh'].concat(dirExculde))
            .pipe(gulp.dest(dirOutput));
});


//版本控制
gulp.task('controlVersion',['minifyJs','buildcss'],function(cb){
    //除了图片外的版本控制
    gulp.src([dirOutput+'/**/*.php',dirOutput+'/**/*.js','!'+dirOutput+'/js/app.js'])
        .pipe(replace(/([^(png|gif|jpeg|jpg)])\?v=\d+/ig,'$1?v='+time))
        .pipe(gulp.dest(dirOutput));

   //将app.js版本重新设置
    gulp.src([dirOutput+'/js/app.js'])
        .pipe(replace(/v=123/g,'v='+time))
        .pipe(gulp.dest(dirOutput+'/js'));

    //***将versionLogFile 重置
    gulp.src([versionLogFile])
        .pipe(replace(/.*/,'exports.versionLog=[];'))
        .pipe(gulp.dest('build'));
});




gulp.task('default',function () {
    del(dirOutput,function() {
        gulp.start('controlVersion');
    })
});

//***监听文件修改并进行版本控制
gulp.task('watch', function (cb) {
    gulp.watch('images/**/*',function(){
        if(arguments[0] && arguments[0].type === 'changed'){
            var path =arguments[0].path,
                m = path.match(/\/images\/(.+\.(png|gif|jpeg|jpg))$/);

            if(!m || !m[1]){
                return;
            }

            console.log(encodeURIComponent(m[1]));

            gulp.src(versionLogFile)
                .pipe(insert.append('exports.versionLog["'+encodeURIComponent(m[1])+'"]=1;'))
                .pipe(gulp.dest('build'))
        }
    })
});



//***图片版本控制
gulp.task('replace',function(){
    var logs = require('./build/versionLog.js'),
        k,
        str = '';


    for (k in logs.versionLog) {

        if (!str) {
            str += decodeURIComponent(k);
        } else {
            str = str + '|' + decodeURIComponent(k);
        }
    }

    if(!str){
        return true;
    }


    var reg = new RegExp('(('+str+')\\?v=)\\d+','g');


    return gulp.src(['**/*.php','**/*.css','js/*.js','**/*.ejs'].concat(dirExculde))
        .pipe(replace(reg,'$1'+time))
        .pipe(gulp.dest(function(file){
            if(file.contents.toString().indexOf(time)>-1){
                console.log(file.history[0]+'>'+time);
                return './';
            }else{
                return '/Users/fudg/Desktop/www/temp';
            }
        }))
});


gulp.task('zip',function(){
    return gulp.src(dirOutput+'/**/*')
        .pipe(zip(config.rootDir+'.zip'))
        .pipe(gulp.dest('./build'));
});


gulp.task('scp',['zip'],function(){
    return gulp.src('build/'+config.rootDir+'.zip')
        .pipe(scp({
            host: config.ip,
            port:config.port,
            username: config.username,
            password: config.pwd,
            dest: '/home/fudongguang/',
            agent: process.env['SSH_AUTH_SOCK'],
            agentForward: true,
            watch: function(client) {
                client.on('write', function(o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error',function(err){
            console.log(err);
        });
});




gulp.task('publish',['scp'],function () {

    var gulpSSH = ssh({
        ignoreErrors: true,
        sshConfig: {
            host: config.ip,
            port: config.port,
            username: config.username,
            password:config.pwd
        }
    });

    return gulpSSH
        .exec(['expect H5.sh '+config.rootDir], {filePath: 'commands.log'})
        .pipe(gulp.dest('build/logs'));
});

var d = new Date()
d.setDate(d.getDate() - 1000);

var node_find_files = require("node-find-files");
gulp.task('test',function(){
    var finder = new node_find_files({
        rootFolder : "/Users/fudg/Desktop/www/H5/20141029/images",
        fileModifiedDate : d
    });

    finder.on("match", function(strPath, stat) {
        console.log(strPath + " - " + stat.mtime);
    })
    finder.on("complete", function() {
        console.log("Finished")
    })
    finder.on("patherror", function(err, strPath) {
        console.log("Error for Path " + strPath + " " + err)  // Note that an error in accessing a particular file does not stop the whole show
    })
    finder.on("error", function(err) {
        console.log("Global Error " + err);
    })
    finder.startSearch();
});




//******old******
