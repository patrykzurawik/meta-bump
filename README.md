# meta-bump

Bump plugin for [meta](https://github.com/mateodelnorte/meta). It will:
* bump provided package with provided version (in it's package.json) and add Git tag
* update appropriate consumer packages `package.json` files with new Git tag version and regenerate yarn.lock/package-lock.json


## Usage

Given that your shared dependency definition looks like e.g.

**.meta**
```js
{
  "projects": {
    "shared-package": "git@github.com:meta-project/shared-package.git",
    "consumer-package": "git@github.com:meta-project/consumer-package.git"
  }
}
```

**package.json** in e.g. `consumer-package`
```
"dependencies": {
    "shared-package": "git+ssh://git@github.com:meta-project/shared-package.git#1.0.0"
}
```

You use `meta bump-[yarn|npm]` like this

```
➜  meta git:(master) ./bin/meta bump-[yarn|npm]

  Usage: meta bump-[yarn|npm] [options] [command]


  Commands:

    bump-yarn PROJECT_NAME   bump given version of specified package in meta and child repositories using yarn
    bump-npm PROJECT_NAME    bump given version of specified package in meta and child repositories using npm
    help [cmd]               display help for [cmd]

  Options:

    -h, --help  output usage information
```

e.g. `meta bump-yarn shared-package`
