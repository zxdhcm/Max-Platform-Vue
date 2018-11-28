FROM nginx

MAINTAINER Max <294113260@qq.com>

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/