# 依赖项

 1. nodejs ^5.2.0
 2. strongloop lastest
 3. mysql

# 安装环境

## nodejs
1. 下载nodejs编译包,wget https://nodejs.org/dist/v5.2.0/node-v5.2.0.tar.gz 
2. ./configure
3. make && make install

## 安装strongloop
1. npm -g install strongloop

## 安装forever
1. npm -g install forever

## 安装依赖项
1. cd build
2. npm install

# 启动命令
foever start . >gmlog.log 