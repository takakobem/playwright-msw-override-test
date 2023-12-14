以下を実行することで、テストがこけます。

1. yarn install
2. yarn test

レスポンスを上書きしている
```javascript
  await worker.use(
    http.get("https://hoge.com/", async () => {
      return new HttpResponse(null, {
        status: 503,
      });
    })
  );
```
をコメントアウトすることでテストが通ることが確認できます。
