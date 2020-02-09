// js文件以umd的形式包装，以script的形式引用时，larkplayer 会直接挂载在window上
// 功能上，支持 pause()、play()、requestFullscreen()、exitFullscreen()、currentTime(second)(跳转到某一时刻) 等
// 事件上，可以监听 play、pause、end、error、timeupdate、loadstart、fullscreen 等

// 【支持所有的html5标准事件】
//1. 准备：未播放前
var player = larkplayer('container',{
    width: 640,
    height: 360,
    src:'https://baikebcs.bdimg.com/baike-other/big-buck-bunny.mp4' // 播放地址
},function () {
    console.log('player is ready')
});
// 2. firstplay事件：第一次播放时
player.on('firstplay',function () {
    console.log('firstplay')
});
// 3. play事件：每次播放时（包括拖动时）
player.on('play',function () {
    console.log('play')
});
// 4. ended事件：结束
player.on('ended',function () {
    console.log('ended');
    player.src("https://www.imooc.com/video/19744/blob:https://www.imooc.com/0fbbccb9-71ff-4794-867c-9b5fe8899dc7");
    player.play();
});
// 5. pause事件：暂停（每次拖动时，先暂停后播放）
player.on('pause',function () {
    console.log('pause...');
});
// 6. timeupdate事件：时间修改（播放过程中则触发）
player.on('timeupdate',function () {
    console.log('timeupdate');
});
// 7. loadstart事件：在ready事件后面
player.on('loadstart',function () {
    console.log('loadstart');
});


// 功能上，支持 pause()、play()、requestFullscreen()、exitFullscreen()、currentTime(second)(跳转到某一时刻) 等
// 事件上，可以监听 play、pause、end、error、timeupdate、loadstart、fullscreen 等
