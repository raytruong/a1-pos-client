# About

This is an offline-first, over-engineered desktop application used to track transactions for a nail salon owned by my
parents.

### UI

-   😍 Vue 3
-   💻 Typescript
-   🌈 Tailwind css
-   ⚡ Electron
    -   Target linux, windows, and mac running your choice of architecture

### Persistence

-   📦 pouch-db stores locally and syncs to a remote IBM Cloudant instance running CouchDB

### Testing

-   🤡 Jest unit tests
-   🌲 Cypress integration tests
-   👷 Act to simulate Github Actions workflows

### CI/CD

-   🚚 GitHub Actions for fully automated:

    -   🧪 Tests
    -   🛠 Builds
    -   🎉 Releases

-   🐳 Docker
    -   🤓 Build to any target without the need to manage dependencies like wine
    -   😴 Simplifies build pipelines
