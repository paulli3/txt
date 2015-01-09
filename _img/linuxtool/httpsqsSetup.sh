#!/bin/bash
ulimit -SHn 65535

#wget http://httpsqs.googlecode.com/files/libevent-2.0.12-stable.tar.gz
tar zxvf libevent-2.0.12-stable.tar.gz
cd libevent-2.0.12-stable/
./configure --prefix=/usr/local/libevent-2.0.12-stable/
make
make install
cd ../

#wget http://httpsqs.googlecode.com/files/tokyocabinet-1.4.47.tar.gz
tar zxvf tokyocabinet-1.4.47.tar.gz
cd tokyocabinet-1.4.47/
./configure --prefix=/usr/local/tokyocabinet-1.4.47/
#注：在32位Linux操作系统上编译Tokyo cabinet，请使用./configure --enable-off64代替./configure，可以使数据库文件突破2GB的限制。
#./configure --enable-off64 --prefix=/usr/local/tokyocabinet-1.4.47/
make
make install
cd ../

#wget http://httpsqs.googlecode.com/files/httpsqs-1.7.tar.gz
tar zxvf httpsqs-1.7.tar.gz
cd httpsqs-1.7/
make
make install
cd ../
