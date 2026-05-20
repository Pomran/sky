# 数据目录说明

将文件放入对应目录后，运行 `npm run build` 即可自动生成索引。

## 目录结构

- `images/` - 相册图片 (.jpg, .jpeg, .png, .gif, .webp)
- `text/` - 小本本文字 (.txt, .md)
- `video/` - 视频文件 (.mp4, .webm, .ogg)，可选同名的 .jpg/.png 作为封面

## 使用方式

1. 把图片放到 `data/images/` 目录
2. 把文本文件放到 `data/text/` 目录
3. 把视频文件放到 `data/video/` 目录（可选添加同名 jpg/png 作为封面）
4. 运行 `npm run build` 更新索引
5. 访问对应页面即可看到内容
