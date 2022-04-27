# 使用 node:16 作为基础镜像过于奢侈，占用体积太大，而最终产物 (js/css/html) 无需依赖该镜像。可使用更小的 nginx 镜像做多阶段构建。
# 多个 RUN 命令，不利于 Docker 的镜像分层存储。可合并为一个 RUN 命令
# 每次都需要 npm i，可合理利用 Docker 缓存，ADD 命令中内容发生改变将会破坏缓存。
# 可将 package.json 提前移至目标目录，只要 package.json/lockfile 不发生变动，将不会重新 npm i

FROM node:alpine as builder
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm config set registry https://registry.npm.taobao.org && \ 
    npm install
ADD ./ ./
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html