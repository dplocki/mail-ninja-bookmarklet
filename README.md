# 🥷 Mail Ninja Bookmarklet

## Running

Install packages (if needed, the packages are connected with Gulp script).

```sh
npm ci
```

Then run:

```sh
npm run build
```

See the `./out` directory.

## Docker

Build the image:

```sh
docker compose build
```

Build the project in the container. The source directory is mounted, so the generated `out` directory is available on the host:

```sh
docker compose run --rm app
```

Open a shell in the development container:

```sh
docker compose run --rm app sh
```

## Fun fact

I have tested the ChatGPT during development. Among other things, it suggest the name of the repository.
