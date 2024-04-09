
```
User selects open file
If user verified goto FileOpenDialog
If user not verified goto VerificationDialog


UserContext
    stores user in chrome.storage.local
    calls validateSession

Sidebar
    index
        verified flag from useTemplate
    VerificationDialog


GET /user?email=value
    router/user.ts
        queryUserByEmail
            queryFirestoreByProperty users.email=value


https://api.syphonx.io/user/verify?id=B34bdNGGOOZMLgIPkO0r

```