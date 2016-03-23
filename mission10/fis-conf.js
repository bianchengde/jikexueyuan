//对js/css/png图片引用添加md5值（文件指纹）
fis.match('*.{js,css,png}', {
	useHash: true
});
//启用fis-spriter-csssprites插件
fis.match('::package',{
	spriter:fis.plugin('csssprites')	
});

//对js/css/图片.html进行压缩
 fis.match('*.js', {
   optimizer: fis.plugin('uglify-js')
 });

 fis.match('*.css', {
 	//对css进行图片合并
   useSprite: true,
   optimizer: fis.plugin('clean-css')
 });

 fis.match('*.png', {
   optimizer: fis.plugin('png-compressor')
 });
 
  fis.match('*.html', {
   optimizer: fis.plugin('html-minifier')
 });

//对js文件进行合并，文件名字可修改
fis.config.set('pack',{
	'/pkg/lib.js':[
		'js/jquery**.js',
		'js/baidu.js',
	],
	//对css进行合并
	'/pkg/aio.css':'**.css'
})


