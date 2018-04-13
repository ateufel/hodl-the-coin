FROM nginx:latest
MAINTAINER Andreas Teufel <a.teufel@limesoda.com>
#ENV TERM xterm
#RUN apt-get update -y

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY default.conf /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/ssl
COPY limesoda-com.crt /etc/nginx/ssl/limesoda-com.crt
COPY limesoda-com.key /etc/nginx/ssl/limesoda-com.key
