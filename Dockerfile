FROM nginx

MAINTAINER Max <294113260@qq.com>

RUN rm /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf

ADD default.conf /etc/nginx/conf.d/

ADD nginx.conf /etc/nginx/

COPY dist/  /usr/share/nginx/html/