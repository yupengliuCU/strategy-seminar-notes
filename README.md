# Reading Notes — 深度解读站点

Static HTML deep-dive site for course readings. Deployed to GitHub Pages (stable, free, survives reboot — no tunnel needed).

## 稳定入口（GitHub Pages）

- 顶层索引：https://yupengliucu.github.io/strategy-seminar-notes/
- 课程主页：https://yupengliucu.github.io/strategy-seminar-notes/seminar-economic-foundations-of-strategy/

## 维护工作流

站点内容就是本目录下的静态 HTML。改完页面后：

```bash
cd "…/reading-notes"
git add -A
git commit -m "docs: <说明>"
git push origin main   # 推送到 GitHub 后 Pages 自动重新部署（约 30–60 秒）
```

不需要云隧道、不需要本机常开。相对链接已保证 `file://` 直接打开也正常。

## 备注

- `serve.sh` / `serve-local.sh` 是旧的 cloudflared 临时隧道方案（每次重启 URL 会变），仅在需要临时分享时用；稳定访问一律用上面的 GitHub Pages 地址。
- `_template.html` 是页面生成模板；`*.tmpdir/`、`.DS_Store` 已被 `.gitignore` 排除。
- 仓库：https://github.com/yupengliuCU/strategy-seminar-notes （public；如需私有，改仓库可见性即可，但 GitHub Pages 免费版仅对 public 仓库开放）。
