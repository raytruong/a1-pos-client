# About

This is an offline-first, over-engineered desktop application used to track transactions for a nail salon owned by my
parents.

### UI

-   ๐ Vue 3
-   ๐ป Typescript
-   ๐ Tailwind css
-   โก Electron
    -   Target linux, windows, and mac running your choice of architecture

### Persistence

-   ๐ฆ pouch-db stores locally and syncs to a remote IBM Cloudant instance running CouchDB

### Testing

-   ๐คก Jest unit tests
-   ๐ฒ Cypress integration tests
-   ๐ท Act to simulate Github Actions workflows

### CI/CD

-   ๐ GitHub Actions for fully automated:

    -   ๐งช Tests
    -   ๐  Builds
    -   ๐ Releases

-   ๐ณ Docker
    -   ๐ค Build to any target without the need to manage dependencies like wine
    -   ๐ด Simplifies build pipelines
